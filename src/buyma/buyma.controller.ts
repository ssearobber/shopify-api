import { Body, Controller, Post, UseFilters, HttpStatus } from '@nestjs/common';
import {BuymaService} from './buyma.service';
import { ShopifyRequstDto } from './dto/shopify.request.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('buyma')
@UseFilters(new HttpExceptionFilter()) // 예외 필터 적용
export class BuymaController {
    constructor(private readonly buymaService : BuymaService){};

    @Post('overwrite')
    async createBuyma(@Body() body: ShopifyRequstDto) {
        try {
            const result = await this.buymaService.createBuymaOverwrite(body);
            // 결과를 클라이언트에 반환합니다.
            return {
                statusCode: HttpStatus.OK,
                message: '성공적으로 처리되었습니다.',
                data: result
            };
        } catch (error) {
            // 에러 처리는 예외 필터에서 자동으로 수행됩니다.
            throw error;
        }
    }
    // @Post('overwrite')
    // createBuyma(@Body() body: ShopifyRequstDto) {
    //     //FIXME: 임시로 데이터 넣음.
    //     body.shopifyAccessToken = "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";
    //     // body.shopifyProductArray = ['8207412789466','8206111768794'];
    //     // body.shopifyProductArray = ['8210163925210'];
    //     body.shopifyProductArray = ['8207412789466'];
    //     body.buymaID = "buymakiki515@gmail.com";
    //     body.buymaPW = "saltsalt0315";
        
    //     if(body.shopifyProductArray.length === 0) return '선택한 상품이 없습니다.';

    //     //TODO: this.buymaService.createBuymaOverwrite(body)에 업무에러가 날 때, 처리하는 return 값

    //     return this.buymaService.createBuymaOverwrite(body);
    // }
}
