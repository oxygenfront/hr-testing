import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export enum Format {
	PDF = 'PDF',
}

export class ExportResultDto {
	@IsString()
	@IsNotEmpty()
	id: string

	@ApiProperty({ enum: Object.keys(Format) })
	format: Format
}
