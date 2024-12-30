import { Module, OnModuleInit } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Price, PriceSchema } from '../prices/price.schema';
import { Product, ProductSchema } from '../products/product.schema';
import { Customer, CustomerSchema } from '../customers/customer.schema';
import { Subscription } from 'rxjs';
import { SubscriptionSchema } from '../subscriptions/subscription.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          return ProductSchema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Price.name,
        useFactory: () => {
          return PriceSchema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Customer.name,
        useFactory: () => {
          return CustomerSchema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Subscription.name,
        useFactory: () => {
          return SubscriptionSchema;
        },
      },
    ]),
  ],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule implements OnModuleInit {
  async onModuleInit() {
    console.log('PaymentsModule initialized');
  }
}
