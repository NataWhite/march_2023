import {Injectable} from "@nestjs/common";
import {UserEntity} from "../database/entities/user.entity";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(private readonly dataSource: DataSource) {
        super(UserEntity, dataSource.manager);


    }
}