import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { serializeProduct, serializeProductsArray } from "../functions";


@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {

                const request: Express.Request = context
                    .switchToHttp()
                    .getRequest();
                const userId = request.user['id'];
                let newProduct: object | Array<object>;

                if (Array.isArray(data)) {
                    newProduct = serializeProductsArray(data, userId);
                }
                else {
                    newProduct = serializeProduct(data, userId);
                }

                return newProduct;


            }),
        );
    }
}