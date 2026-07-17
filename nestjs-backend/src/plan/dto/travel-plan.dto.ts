import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TravelDatesDto {
  @IsString()
  @IsOptional()
  start?: string = '';

  @IsString()
  @IsOptional()
  end?: string = '';
}

export class TravelPlanRequestDto {
  @IsString()
  @IsOptional()
  name?: string = '';

  @IsString()
  @IsOptional()
  destination?: string = '';

  @IsString()
  @IsOptional()
  starting_location?: string = '';

  @ValidateNested()
  @Type(() => TravelDatesDto)
  travel_dates: TravelDatesDto = new TravelDatesDto();

  @IsString()
  @IsOptional()
  date_input_type?: string = 'picker';

  @IsInt()
  @IsOptional()
  duration?: number = 0;

  @IsString()
  @IsOptional()
  traveling_with?: string = '';

  @IsInt()
  @IsOptional()
  adults?: number = 1;

  @IsInt()
  @IsOptional()
  children?: number = 0;

  @IsArray()
  @IsOptional()
  age_groups?: string[] = [];

  @IsInt()
  @IsOptional()
  budget?: number = 75000;

  @IsString()
  @IsOptional()
  budget_currency?: string = 'INR';

  @IsString()
  @IsOptional()
  travel_style?: string = '';

  @IsBoolean()
  @IsOptional()
  budget_flexible?: boolean = false;

  @IsArray()
  @IsOptional()
  vibes?: string[] = [];

  @IsArray()
  @IsOptional()
  priorities?: string[] = [];

  @IsString()
  @IsOptional()
  interests?: string = '';

  @IsInt()
  @IsOptional()
  rooms?: number = 1;

  @IsArray()
  @IsOptional()
  pace?: number[] = [3];

  @IsString()
  @IsOptional()
  been_there_before?: string = '';

  @IsString()
  @IsOptional()
  loved_places?: string = '';

  @IsString()
  @IsOptional()
  additional_info?: string = '';
}

export class TravelPlanAgentRequestDto {
  @IsString()
  @IsNotEmpty()
  trip_plan_id!: string;

  @ValidateNested()
  @Type(() => TravelPlanRequestDto)
  travel_plan!: TravelPlanRequestDto;
}

export class TravelPlanResponseDto {
  @IsBoolean()
  success!: boolean;

  @IsString()
  message!: string;

  @IsString()
  trip_plan_id!: string;
}
