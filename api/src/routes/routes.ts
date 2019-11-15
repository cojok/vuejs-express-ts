import axios, { AxiosPromise } from "axios";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

export class Routes {
  private readonly carList: any = {};
  constructor() {
    this.carList = this.getCarlist();
  }
  public routes(app: any): void {
    app.route("/")
      .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const list = await this.carList;
          const cars = this.sort("price-low", list);
          const finalCars: any = {};
          for (const i in cars) {
            finalCars[i] = {
              id: cars[i].id,
              image: cars[i].teaser.teaserImage,
              price: cars[i].pricing.price,
              title: cars[i].teaser.title
            };
          }
          return res.json(finalCars);
        } catch (error) {
          return next(new Error(error));
        }
      });
    app.route("/:id")
      .get(async (req: Request, res: Response, next: NextFunction) => {
          try {
            const car: any = await this.returnSpecificCar(req.params.id);
            return res.json(car);
          } catch (error) {
            return next(new Error(error));
          }
      });

    app.route("/sort/:type")
      .get(async (req: Request, res: Response, next: NextFunction) => {
        try {
          const {
            type
          } = req.params;
          const list = await this.carList;
          const cars = this.sort(type, list);
          const finalCars: any = {};
          for (const i in cars) {
            finalCars[i] = {
              id: cars[i].id,
              image: cars[i].teaser.teaserImage,
              price: cars[i].pricing.price,
              title: cars[i].teaser.title
            };
          }
          return res.json(finalCars);
        } catch (error) {
          return next(new Error(error));
        }
    });
  }
private async returnSpecificCar(id: any): Promise<AxiosPromise> {
    try {
      const cars = await this.carList;
      let car: any = null;
      for (const i in cars) {
        if (cars[i].id === id) {
          car = {
            deliveryFee: cars[i].pricing.deliveryFee,
            id: cars[i].id,
            image: cars[i].teaser.teaserImage,
            kmIncluded: cars[i].pricing.includedAnnualKilometers,
            options: cars[i].car,
            price: cars[i].pricing.price,
            startingFee: cars[i].pricing.startingFee,
            title: cars[i].teaser.title
          };
        }
      }
      return car;
    } catch (error) {
      return error;
    }
  }
  private async getCarlist(): Promise < AxiosPromise > {
    try {
      const data = await axios.get(process.env.API_URL);
      const result = this.mapper(data.data.Items);
      const response: any = [];
      for (const i in result) {
        if (result[i].visible) {
          response.push(result[i]);
        }
      }
      const final: any = this.sort("price-low", response);
      return final;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  // @ts-ignore
  private mapper(data) {

    const S = "S";
    const SS = "SS";
    const NN = "NN";
    const NS = "NS";
    const BS = "BS";
    const BB = "BB";
    const N = "N";
    const BOOL = "BOOL";
    const NULL = "NULL";
    const M = "M";
    const L = "L";

    if (this.isObject(data)) {
        // tslint:disable-next-line: forin
        for (const i in data) {
          const keys = Object.keys(data[i]);
          if (this.isObject(data[i])) {
            this.mapper(data[i]);
          }
          while (keys.length) {
              const key = keys.shift();
              const types = data[i][key];

              if (this.isObject(types) && types.hasOwnProperty(S)) {
                  data[i][key] = types[S];
              } else if (this.isObject(types) && types.hasOwnProperty(N)) {
                  data[i][key] = parseFloat(types[N]);
              } else if (this.isObject(types) && types.hasOwnProperty(BOOL)) {
                  data[i][key] = types[BOOL];
              } else if (this.isObject(types) && types.hasOwnProperty(NULL)) {
                  data[i][key] = null;
              } else if (this.isObject(types) && types.hasOwnProperty(M)) {
                  data[i][key] = this.mapper(types[M]);
              } else if (this.isObject(types) && types.hasOwnProperty(L)) {
                  data[i][key] = this.mapper(types[L]);
              } else if (this.isObject(types) && types.hasOwnProperty(SS)) {
                  data[i][key] = types[SS];
              } else if (this.isObject(types) && types.hasOwnProperty(NN)) {
                  data[i][key] = types[NN];
              } else if (this.isObject(types) && types.hasOwnProperty(BB)) {
                  data[i][key] = types[BB];
              } else if (this.isObject(types) && types.hasOwnProperty(NS)) {
                  data[i][key] = types[NS];
              } else if (this.isObject(types) && types.hasOwnProperty(BS)) {
                  data[i][key] = types[BS];
              }
          }
        }
    }

    return data;
  }

  private isObject(value: any) {
    return typeof value === "object" && value !== null;
  }

  private sort(flag: string, result: { [x: string]: any; }) {
    switch (flag) {
      case "price-low":
        result.sort((a: { pricing: { price: number; }; }, b: { pricing: { price: number; }; }) => {
          return a.pricing.price - b.pricing.price;
        });
        break;
      case "price-high":
        result.sort((a: { pricing: { price: number; }; }, b: { pricing: { price: number; }; }) => {
          return b.pricing.price - a.pricing.price;
        });
        break;
      case "name-A":
        result.sort((a: { car: { make: string; }; }, b: { car: { make: string; }; }) => {
          return a.car.make.localeCompare(b.car.make);
        });
        break;
      case "name-Z":
        result.sort((a: { car: { make: string; }; }, b: { car: { make: string; }; }) => {
          return b.car.make.localeCompare(a.car.make);
        });
        break;
    }
    return result;
  }
}
