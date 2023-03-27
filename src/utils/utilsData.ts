import { ProductType } from "./ts-types/__store/typesProduct";

export const statesInNigeria = {
  abia: 4650,
  adamawa: 2743,
  "akwa ibom": 4590,
  anambra: 3255,
  bauchi: 2088,
  benue: 2487,
  borno: 4408,
  "cross river": 4772,
  delta: 4908,
  ebonyi: 4846,
  edo: 2853,
  ekiti: 3036,
  enugu: 3930,
  gombe: 4479,
  imo: 4735,
  jigawa: 2729,
  kaduna: 3337,
  kano: 2310,
  katsina: 4055,
  kebbi: 3129,
  kogi: 2441,
  kwara: 4141,
  lagos: 2009,
  nasarawa: 2384,
  niger: 3461,
  ogun: 3952,
  ondo: 3599,
  osun: 2135,
  oyo: 4813,
  plateau: 2732,
  rivers: 3282,
  sokoto: 2332,
  taraba: 2511,
  yobe: 3208,
  zamfara: 2555,
  abuja: 4235,
};

export const phoneNumberFormats = ["234", "080", "070", "081", "090", "091"];

export const userForm = {
  firstName: {
    placeholder: "First Name",
    gridProps: { xs: 12, sm: 5.5 },
  },
  lastName: {
    placeholder: "Last Name",
    gridProps: { xs: 12, sm: 5.5 },
  },
  address: {
    placeholder: "Address",
    gridProps: { xs: 12 },
  },
  phoneNo: {
    placeholder: "Phone Number",
    gridProps: { xs: 12, sm: 3.5 },
  },
  city: {
    placeholder: "City",
    gridProps: { xs: 12, sm: 3.5 },
  },
  state: {
    placeholder: "State",
    gridProps: { xs: 12, sm: 3.5 },
  },
};

export const tags = ["shoe", "belt", "bag"];

const checkEnv =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_TEST_DATA
    : process.env.NEXT_DATA;

export const testData: ProductType[] = JSON.parse(
  (checkEnv as string) || "[]"
) as ProductType[];
