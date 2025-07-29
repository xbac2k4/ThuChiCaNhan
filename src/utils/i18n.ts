import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_VI from "../language/vi/home.json";
import HOME_EN from "../language/en/home.json";
import STATISTICAL_EN from "../language/en/statistical.json";
import STATISTICAL_VI from "../language/vi/statistical.json";
import TRANSACTIONS_EN from "../language/en/transactions.json";
import TRANSACTIONS_VI from "../language/vi/transactions.json";


const resources = {
    vi: {
        home: HOME_VI,
        statistical: STATISTICAL_VI,
        transactions: TRANSACTIONS_VI
    },
    en: {
        home: HOME_EN,
        statistical: STATISTICAL_EN,
        transactions: TRANSACTIONS_EN
    }
};
i18n.use(initReactI18next).init({
    resources,
    lng: "vi",
    fallbackLng: "vi",
    ns: ['home', 'statistical', 'transactions'],
    interpolation: {
        escapeValue: false
    }
});

export default i18n;