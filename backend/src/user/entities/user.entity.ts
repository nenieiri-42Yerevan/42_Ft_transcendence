import { Chat } from 'src/chat/entities/chat.entity';
import { GroupChat } from 'src/chat/entities/group-chat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Avatar, Session, Match } from './index';

export type Gender = 'male' | 'female';

export enum Status {
  OFFLINE = 0,
  ONLINE,
  GAME,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: false, unique: true, length: 45 })
  username: string;

  @Column({ nullable: false, unique: true, length: 45 })
  email: string;

  @Column({ nullable: false, select: true })
  password: string;

  @Column({ type: 'enum', nullable: false, enum: ['male', 'female'] })
  gender: Gender;

  @Column({ type: 'timestamptz', nullable: true })
  date_of_birth: Date;

  @Column({ default: 0 })
  rank: number;

  @Column({ default: Status.OFFLINE })
  status: Status;

  @Column({ default: false })
  TFA_enabled: boolean;

  @CreateDateColumn({ default: () => 'NOW()' })
  created_at: Date;

  @Column('int', { array: true, default: [] })
  follows: number[];

  @Column('int', { array: true, default: [] })
  blocked: number[];

  @OneToOne(() => Avatar, (avatar) => avatar.user)
  avatar: Avatar;

  @OneToMany(() => Session, (session) => session.owner)
  sessions: Session[];

  @OneToMany(() => Match, (match) => match.winner)
  won: Match[];

  @OneToMany(() => Match, (match) => match.loser)
  lost: Match[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];

  @OneToMany(() => GroupChat, (gc) => gc.owner)
  createdGroups: GroupChat[];
}
