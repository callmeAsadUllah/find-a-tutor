import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../products/product.schema';
import { Price } from '../prices/price.schema';
import { CreateProductDto } from '../products/dtos/product.dto';
import { CreatePriceDto } from '../prices/dtos/price.dto';
import { Customer, CustomerDocument } from '../customers/customer.schema';
import { Subscription } from 'rxjs';
import { SubscriptionDocument } from '../subscriptions/subscription.schema';
import { CreateCustomerDto } from '../customers/dtos/customer.dto';
import { CreateSubscriptionDto } from '../subscriptions/dtos/subscription.dto';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private stripe: Stripe;

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(Price.name)
    private readonly priceModel: Model<ProductDocument>,
    @InjectModel(Customer.name)
    private readonly customerModel: Model<CustomerDocument>,
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
    private readonly configService: ConfigService,
  ) {
    const secretKey = this.configService.get<string>('STRIPE_API_SECRET');
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  async onModuleInit() {
    console.log('PaymentsService initialized');
  }

  async createStripeProduct(createProductDto: CreateProductDto) {
    try {
      const productObject = await this.stripe.products.create({
        name: createProductDto.name,
        description: `${createProductDto.name} subscription plan`,
        metadata: {
          userId: createProductDto.userId.toString(),
        },
      });

      console.log(productObject);

      const product = new this.productModel({ ...createProductDto });

      await product.save();

      console.log(productObject);

      return product;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async createStripePrice(createPriceDto: CreatePriceDto) {
    try {
      const priceObject = await this.stripe.prices.create({
        unit_amount: Math.round(createPriceDto.amount * 100),
        currency: createPriceDto.currency,
        recurring: { interval: createPriceDto.interval },
        product: createPriceDto.productId,
        metadata: {
          userId: createPriceDto.userId.toString(),
        },
      });

      console.log(priceObject);

      const price = new this.priceModel({ ...createPriceDto });

      console.log(price);

      await price.save();

      return price;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async createStripeCustomer(createCustomerDto: CreateCustomerDto) {
    try {
      const customerObject = await this.stripe.customers.create({
        name: createCustomerDto.name,
        email: createCustomerDto.email,
        payment_method: createCustomerDto.paymentMethod,
        invoice_settings: {
          default_payment_method: createCustomerDto.paymentMethod,
        },
        metadata: {
          userId: createCustomerDto.userId.toString(),
        },
      });

      console.log(customerObject);

      const customer = new this.customerModel({ ...createCustomerDto });

      console.log(customer);

      await customer.save();

      return customer;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }

  async createStripeSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    try {
      const subscriptionObject = await this.stripe.subscriptions.create({
        customer: createSubscriptionDto.customerId,
        items: [{ price: createSubscriptionDto.priceId }],
        metadata: {
          userId: createSubscriptionDto.userId.toString(),
        },
      });

      console.log(subscriptionObject);

      const subscription = new this.subscriptionModel({
        ...createSubscriptionDto,
      });

      console.log(subscription);

      await subscription.save();

      return subscription;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
