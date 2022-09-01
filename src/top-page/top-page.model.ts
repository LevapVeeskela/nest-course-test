import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}
export class HhData {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}
export class Advantage {
  title: string;
  description: string;
}

export interface TopPageModel extends Base { }
export class TopPageModel extends TimeStamps {
  @prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;
  @prop()
  secondCategoty: string;

  @prop({ unique: true })
  alias: string;

  @prop()
  title: string;

  @prop()
  category: string;

  @prop({ type: () => HhData })
  hh?: HhData;

  @prop({ type: () => [Advantage] })
  advantages: Advantage[];

  @prop()
  seoText: string;

  @prop()
  tagsTitle: string;

  @prop()
  tags: string[];
}
