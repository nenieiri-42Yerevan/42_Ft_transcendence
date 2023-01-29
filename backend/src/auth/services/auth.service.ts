import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../dto';
import { UserService } from '../../user/services/user.service';
import { SessionService } from '../../user/services/session.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private sessionService: SessionService,
		private jwtService: JwtService,
	) {}

	// creatinhg user session and connection
	async signinLocal(dto: SignInDto)
	{
		const user = await this.userService.findByUsername(dto.username);

		if (user && await argon.verify(user.password, dto.password))
		{
			const tokens = await this.generateJWT(user.id, user.username);
			const new_session = await this.sessionService.create(null, tokens.refreshToken, user);
			await this.sessionService.update(user.id, new_session);
			return (user);
		}
		else
			throw new HttpException('Wrong password', HttpStatus.NOT_FOUND);
	}

	// generating and returning JSON Web Token
	async generateJWT(userId: number, username: string)
	{
		const [at, rt] = await Promise.all([
			this.jwtService.signAsync
			(
				{
					sub: userId,
					username: username,
				},
				{
					secret: 'at-token',
					expiresIn: 60 * 15,
				}
			),
			this.jwtService.signAsync
			(
				{
					sub: userId,
					username: username,
				},
				{
					secret: 'rt-token',
					expiresIn: 60 * 60 * 24 * 7,
				}
			),
		]);
		return ({
			accessToken: at,
			refreshToken: rt,
		});
	}
}
