import { 
    Controller, Get, Post, Patch, Body, Param, UseGuards,
    Req, UseInterceptors, UploadedFile, HttpException, HttpCode
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyService } from '../services';
import { CreateCompanyDto, UpdateCompanyDto, UpdateCompanyLogoDto } from '../dtos';
import { AuthGuard } from '../middleware';
import { ResponseService } from '../utils';


@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
        private readonly responseService: ResponseService
    ) { }

    @Post('')
    @HttpCode(201)
    @UseGuards(AuthGuard)
    async createCompany(
        @Body() createCompanyDto: CreateCompanyDto,
        @Req() request: any
    ) {
        try {
            createCompanyDto.user_id = request.user.uid;
            createCompanyDto.is_admin = request.user.is_admin;

            const user = await this.companyService.createCompany(createCompanyDto);

            return this.responseService.generateSuccessResponse(user, 'Company created successfully', 201);

        } catch (error) {
            const message = error.message || 'Error creating company';

            throw new HttpException(message, error?.code || 400);

        }
    }

    @Patch('/image')
    @UseGuards(AuthGuard)
    async updateCompanyLogo(
        @Body() updateCompanyLogoDto: UpdateCompanyLogoDto,
        @Req() request: any,
    ) {
        try {            
            updateCompanyLogoDto.is_admin = request.user.is_admin;

            const company = await this.companyService.updateCompanyLogo(updateCompanyLogoDto);

            return this.responseService.generateSuccessResponse(company, 'Company image uploaded successfully');

        } catch (error) {
            const message = error.message || 'Error uploading company image';

            throw new HttpException(message, error?.code || 400);

        }
    }

    @Patch('/:id/image')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingleLogo(
        @Body() uploadImageDto: any,
        @Req() request: any,
        @Param('id') id: string,
        @UploadedFile() file: any,
    ) {
        try {
            uploadImageDto.is_admin = request.user.is_admin;
            uploadImageDto.id = id;

            const company = await this.companyService.updateSingleCompanyLogo(uploadImageDto, file.buffer, file.originalname);

            return this.responseService.generateSuccessResponse(company, 'Image uploaded successfully');

        } catch (error) {
            const message = error.message || 'Error uploading image';

            throw new HttpException(message, error?.code || 400);

        }

    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
    async updateCompany(
        @Body() updateCompanyDto: UpdateCompanyDto,
        @Param('id') id: string,
        @Req() request: any
    ) {
        try {
            updateCompanyDto.user_id = request.user.uid;
            updateCompanyDto.id = Number(id);
            updateCompanyDto.is_admin = request.user.is_admin;

            const company = await this.companyService.updateCompany(updateCompanyDto);

            return this.responseService.generateSuccessResponse(company, 'Company updated successfully');

        } catch (error) {
            const message = error.message || 'Error updating company';

            throw new HttpException(message, error?.code || 400);

        }

    };

    @Post('/image-upload')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    async uploadLogo(
        @Body() uploadImageDto: any,
        @Req() request: any,
        @UploadedFile() file: any,
    ) {
        try {
            uploadImageDto.is_admin = request.user.is_admin;

            const image = await this.companyService.uploadImage(uploadImageDto, file.buffer, file.originalname);

            return this.responseService.generateSuccessResponse({ image }, 'Image uploaded successfully');

        } catch (error) {
            const message = error.message || 'Error uploading image';

            throw new HttpException(message, error?.code || 400);

        }

    }

    @Get('')
    @UseGuards(AuthGuard)
    async getCompanyByUserId(
        @Req() request: any
    ) {
        try {
            const user_id = request.user.uid;

            const company = await this.companyService.getCompanyByUserId(user_id);

            return this.responseService.generateSuccessResponse(company, 'Company updated successfully');

        } catch (error) {
            const message = error.message || 'Error updating company';

            throw new HttpException(message, error?.code || 400);

        }

    };

    @Get('/all')
    @UseGuards(AuthGuard)
    async getAllCompany(
        @Req() request: any
    ) {
        try {
            const is_admin = request.user.is_admin;

            const company = await this.companyService.getAllCompany(is_admin);

            return this.responseService.generateSuccessResponse(company, 'Company updated successfully', 200);

        } catch (error) {
            const message = error.message || 'Error updating company';

            throw new HttpException(message, error?.code || 400);

        }

    };

}
