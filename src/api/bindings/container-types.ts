let InstancesList: any[] = [
  "Admins",
  "Auth",
  "Blacklists",
  "Buyers",
  "Categories",
  "Firms",
  "PaymentCollections",
  "PaymentModes",
  "Permissions",
  "Prefixes",
  "Products",
  "RentalProducts",
  "Rentals",
  "Roles",
  "Sellers",
  "Subscriptions",
  "TermsAndConditions",
];

let AdapterList: any[] = [];
let HelperList: any[] = [];

export const Instances: Record<string, symbol> = generateInstancesList();

function generateInstancesList() {
  let out: Record<string, any> = {
    BaseRepository: Symbol.for("BaseRepository"),
    BaseService: Symbol.for("BaseService"),
    BaseAdapter: Symbol.for("BaseAdapter"),
  };
  for (let i of InstancesList) {
    let repositoryName: string = `${i}Repository`;
    let serviceName: string = `${i}Service`;
    out[repositoryName] = Symbol.for(repositoryName);
    out[serviceName] = Symbol.for(serviceName);
  }
  for (let i of AdapterList) {
    let adapterName: string = `${i}Adapter`;
    out[adapterName] = Symbol.for(adapterName);
  }
  for (let i of HelperList) {
    let helperName: string = `${i}Helper`;
    out[helperName] = Symbol.for(helperName);
  }
  return out;
}
