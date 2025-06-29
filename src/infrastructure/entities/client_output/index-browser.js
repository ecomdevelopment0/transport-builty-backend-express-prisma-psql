
/* !!! This is code generated by Prisma. Do not edit directly. !!!
/* eslint-disable */

Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.8.2
 * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
 */
Prisma.prismaVersion = {
  client: "6.8.2",
  engine: "2060c79ba17c6bb9f5823312b6f6b7f4a845738e"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AdminsScalarFieldEnum = {
  id: 'id',
  full_name: 'full_name',
  mobile: 'mobile',
  email: 'email',
  image: 'image',
  username: 'username',
  alternate_mobile: 'alternate_mobile',
  address: 'address',
  documents: 'documents',
  city: 'city',
  state: 'state',
  country: 'country',
  pin_code: 'pin_code',
  adhaar_number: 'adhaar_number',
  driving_license_number: 'driving_license_number',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.BlacklistsScalarFieldEnum = {
  id: 'id',
  refresh_token: 'refresh_token',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.ChargesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  firm_id: 'firm_id',
  description: 'description',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.CustomersScalarFieldEnum = {
  id: 'id',
  firm_id: 'firm_id',
  full_name: 'full_name',
  mobile: 'mobile',
  type: 'type',
  email: 'email',
  image: 'image',
  username: 'username',
  alternate_mobile: 'alternate_mobile',
  gst_number: 'gst_number',
  pan_card_number: 'pan_card_number',
  address: 'address',
  media: 'media',
  documents: 'documents',
  city: 'city',
  state: 'state',
  country: 'country',
  pin_code: 'pin_code',
  adhaar_number: 'adhaar_number',
  driving_license_number: 'driving_license_number',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.FirmsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  mobile: 'mobile',
  mobile_1: 'mobile_1',
  mobile_2: 'mobile_2',
  mobile_3: 'mobile_3',
  email: 'email',
  website: 'website',
  media: 'media',
  gst_number: 'gst_number',
  pan_card_number: 'pan_card_number',
  address: 'address',
  city: 'city',
  state: 'state',
  country: 'country',
  pin_code: 'pin_code',
  description: 'description',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.InvoicesScalarFieldEnum = {
  id: 'id',
  to_customer_id: 'to_customer_id',
  from_customer_id: 'from_customer_id',
  payment_mode_id: 'payment_mode_id',
  invoice_id: 'invoice_id',
  invoice_date: 'invoice_date',
  invoice_status: 'invoice_status',
  transport_details: 'transport_details',
  charges: 'charges',
  is_opted_for_insurance: 'is_opted_for_insurance',
  goods_value: 'goods_value',
  demurrage_day: 'demurrage_day',
  demurrage_charges: 'demurrage_charges',
  advance_amount: 'advance_amount',
  payable_amount: 'payable_amount',
  total_amount: 'total_amount',
  products: 'products',
  signature: 'signature',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  created_by: 'created_by',
  created_at: 'created_at',
  modified_at: 'modified_at',
  modified_by: 'modified_by'
};

exports.Prisma.OwnersScalarFieldEnum = {
  id: 'id',
  firm_id: 'firm_id',
  full_name: 'full_name',
  mobile: 'mobile',
  email: 'email',
  image: 'image',
  username: 'username',
  alternate_mobile: 'alternate_mobile',
  address: 'address',
  documents: 'documents',
  city: 'city',
  state: 'state',
  country: 'country',
  pin_code: 'pin_code',
  adhaar_number: 'adhaar_number',
  driving_license_number: 'driving_license_number',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.Payment_collectionsScalarFieldEnum = {
  id: 'id',
  rental_id: 'rental_id',
  firm_id: 'firm_id',
  payment_mode_id: 'payment_mode_id',
  amount: 'amount',
  description: 'description',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.Payment_modesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  firm_id: 'firm_id',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.PrefixesScalarFieldEnum = {
  id: 'id',
  object_type: 'object_type',
  name: 'name',
  start: 'start',
  end: 'end',
  current: 'current',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.ProductsScalarFieldEnum = {
  id: 'id',
  firm_id: 'firm_id',
  name: 'name',
  code: 'code',
  rate: 'rate',
  weight: 'weight',
  number_of_packs: 'number_of_packs',
  mrp: 'mrp',
  fine: 'fine',
  deposit: 'deposit',
  description: 'description',
  unit: 'unit',
  color: 'color',
  type: 'type',
  barcode: 'barcode',
  brand: 'brand',
  size: 'size',
  stock: 'stock',
  keywords: 'keywords',
  media: 'media',
  status: 'status',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.Provider_configurationsScalarFieldEnum = {
  id: 'id',
  provider_type: 'provider_type',
  name: 'name',
  description: 'description',
  contact_number: 'contact_number',
  email: 'email',
  identifier: 'identifier',
  url: 'url',
  type: 'type',
  user_name: 'user_name',
  password: 'password',
  client_id: 'client_id',
  client_password: 'client_password',
  api_key: 'api_key',
  api_secret: 'api_secret',
  status: 'status',
  sender_details: 'sender_details',
  outlet_reference: 'outlet_reference',
  redirect_url: 'redirect_url',
  additional_properties: 'additional_properties',
  sender_id: 'sender_id',
  account_usage_type_id: 'account_usage_type_id',
  access_key_id: 'access_key_id',
  secret_access_key: 'secret_access_key',
  region: 'region',
  bucket: 'bucket',
  cdn: 'cdn',
  project_id: 'project_id',
  key_file_name: 'key_file_name',
  cloud_name: 'cloud_name',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  created_by: 'created_by',
  created_at: 'created_at',
  modified_at: 'modified_at',
  modified_by: 'modified_by'
};

exports.Prisma.SettingsScalarFieldEnum = {
  id: 'id',
  is_sms_otp_mode_live: 'is_sms_otp_mode_live',
  is_email_otp_mode_live: 'is_email_otp_mode_live',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.SubscriptionsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  price: 'price',
  validity: 'validity',
  description: 'description',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.TemplatesScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  type: 'type',
  template_type: 'template_type',
  provider_name: 'provider_name',
  name: 'name',
  subject: 'subject',
  description: 'description',
  provider_template_code: 'provider_template_code',
  template: 'template',
  instruction: 'instruction',
  parameters: 'parameters',
  is_html: 'is_html',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.Terms_and_conditionsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  firm_id: 'firm_id',
  description: 'description',
  active_flag: 'active_flag',
  delete_flag: 'delete_flag',
  modified_at: 'modified_at',
  created_at: 'created_at',
  created_by: 'created_by',
  modified_by: 'modified_by'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.InvoiceStatus = exports.$Enums.InvoiceStatus = {
  paid: 'paid',
  unpaid: 'unpaid',
  partially_paid: 'partially_paid',
  overdue: 'overdue'
};

exports.Status = exports.$Enums.Status = {
  available: 'available',
  unavailable: 'unavailable'
};

exports.Prisma.ModelName = {
  admins: 'admins',
  blacklists: 'blacklists',
  charges: 'charges',
  customers: 'customers',
  firms: 'firms',
  invoices: 'invoices',
  owners: 'owners',
  payment_collections: 'payment_collections',
  payment_modes: 'payment_modes',
  prefixes: 'prefixes',
  products: 'products',
  provider_configurations: 'provider_configurations',
  settings: 'settings',
  subscriptions: 'subscriptions',
  templates: 'templates',
  terms_and_conditions: 'terms_and_conditions'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
