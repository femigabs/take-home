import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto, UpdateCompanyLogoDto } from '../dtos';
import { CreateCompanyEntity } from '../entities';
import { DatabaseRepository, CompanyQueries } from '../database';
import { AwsS3Service } from 'src/config';

@Injectable()
export class CompanyService {
    constructor(
        private readonly databaseRepository: DatabaseRepository,
        private readonly awsS3Service: AwsS3Service
    ) { }

    async createCompany(data: CreateCompanyDto): Promise<CreateCompanyEntity> {
        if (data.is_admin) {
            throw { message: 'Forbidden Resource', code: 403 };
        };

        const percentage = (data.number_of_product / data.number_of_user) * 100;

        const payload = [
            data.name,
            data.number_of_product,
            data.number_of_user,
            percentage,
            data.user_id
        ];

        const company = await this.databaseRepository.queryOne(CompanyQueries.createCompany, payload);

        return company;
    };

    async updateCompany(data: UpdateCompanyDto): Promise<CreateCompanyEntity> {
        if (data.is_admin) {
            throw { message: 'Forbidden Resource', code: 403 };
        };

        const company: CreateCompanyEntity = await this.databaseRepository.queryOne(
            CompanyQueries.getCompanyById, [data.id]
        );

        if (!company) {
            throw { message: 'Company not found', code: 404 };
        };

        if (company.user_id !== data.user_id) {
            throw { message: 'Forbidden Resource', code: 403 };
        };

        const newData = { ...company, ...data };

        const percentage = (newData.number_of_product / newData.number_of_user) * 100;

        const payload = [
            newData.name,
            newData.number_of_product,
            newData.number_of_user,
            percentage,
            data.id,
            data.user_id,
        ];

        const result = await this.databaseRepository.queryOne(CompanyQueries.updateCompany, payload);

        return result;
    };

    async uploadImage(data: UpdateCompanyDto, fileBuffer: Buffer,  originalFilename: string): Promise<string> {
        if (!data.is_admin) {
            throw { message: 'Forbidden Resource', code: 403 };
        };

        const imageUrl: string = await this.awsS3Service.uploadImage(fileBuffer, originalFilename);

        return imageUrl;

    };

    async updateCompanyLogo(body: UpdateCompanyLogoDto): Promise<CreateCompanyEntity[]> {
        const { images, is_admin } = body;
    
        if (!is_admin) {
            throw { message: 'Forbidden Resource', code: 403 };
        };

        const updatedRecords = await Promise.all(
            images.map((el) => {
                return this.databaseRepository.queryOne(
                    CompanyQueries.updateCompanyLogo, [el.url, el.id]
                );
            })
        );

        return updatedRecords;

    };

    async updateSingleCompanyLogo(data: UpdateCompanyDto, fileBuffer: Buffer,  originalFilename: string): Promise<CreateCompanyEntity> {
    
        const url = await this.uploadImage(data, fileBuffer, originalFilename);

        const updatedRecord = this.databaseRepository.queryOne(
            CompanyQueries.updateCompanyLogo, [url, data.id]
        );

        return updatedRecord;

    };

    async getCompanyByUserId(user_id: string): Promise<CreateCompanyEntity[]> {
        
        const result = await this.databaseRepository.queryAny(CompanyQueries.getCompanyByUserId, [user_id]);

        return result;

    };

    async getAllCompany(is_admin: boolean): Promise<CreateCompanyEntity[]> {

        if (!is_admin) {
            throw { message: 'Forbidden Resource', code: 403 };
        };
        
        const result = await this.databaseRepository.queryAny(CompanyQueries.getAllCompany);

        return result;

    };
}
