import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

@Schema()
export class Image extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
