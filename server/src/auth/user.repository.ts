import { AuthRegisterDto } from './dto/auth-register.dto';
import { User } from 'src/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authRegisterlDto: AuthRegisterDto): Promise<void> {
    const user = this.create(authRegisterlDto);

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.playlists', 'playlists')
      .leftJoinAndSelect('playlists.musics', 'musics')
      .leftJoinAndSelect('musics.user', 'pmu')
      .select(['user', 'playlists', 'musics', 'pmu.nickname'])
      .addSelect('user.hashedRefreshToken')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new UnauthorizedException(`Can't find User with id: ${username}`);
    }

    return user;
  }

  async findUserById(id: string) {
    const user = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.playlists', 'playlists')
      .leftJoinAndSelect('playlists.musics', 'musics')
      .leftJoinAndSelect('musics.user', 'pmu')
      .select(['user', 'playlists', 'musics', 'pmu.nickname'])
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`Can't find User with id: ${id}`);
    }

    return user;
  }

  async updateRefreshToken(user: User, hashedRefreshToken?: string) {
    return this.createQueryBuilder()
      .update(User)
      .set({ hashedRefreshToken })
      .where('id = :id', { id: user.id })
      .execute();
  }
}
