import { TagEntity } from '@monkedeals/postgresql-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  async list(): Promise<string[]> {
    const tagEntities = await this.tagRepository.find();
    const tags = tagEntities.map((tag) => tag.name);

    return tags;
  }
}
