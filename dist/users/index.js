import { createBrowser } from "../lib/browser";
import {
  getNodeToString,
  getNodesToStringsArray,
  createPage,
} from "../lib/page";
import { login } from "..";
const userPageSelector = {
  about:
    "#js-settings-content > div.b-settings-profile-comment > div > div.b-form-form.b-form-edittoggleform.is-readonly > div.is-readonly > div > div > span > span",
  basicProfile: {
    displayName:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(1) > dd > div > div > span",
    name: {
      givenName:
        "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl.b-form-row-labeledpair.is-readonly > dd > div.b-form-input-forminput.b-form-input-forminput-inputname-givenName > div > span",
      surName:
        "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl.b-form-row-labeledpair.is-readonly > dd > div.b-form-input-forminput.b-form-input-forminput-inputname-surName > div > span",
    },
    yomigana: {
      surNameReading:
        "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(3) > dd > div.b-form-input-forminput.b-form-input-forminput-inputname-surNameReading > div > span",
      givenNameReading:
        "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(3) > dd > div.b-form-input-forminput.b-form-input-forminput-inputname-givenNameReading > div > span",
    },
    departments:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(4) > dd > ul > li",
    priorityDepartment:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(5) > dd > div > span",
    birthday:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(6) > dd > div > span",
    hireDate:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(7) > dd > div > span",
    employeeID:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(8) > dd > div > div > span",
    timeZone:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(9) > dd > div > span",
    language:
      "#js-settings-content > div.b-settings-profile-general > div > div.b-form-form.b-form-edittoggleform.is-readonly > dl:nth-child(10) > dd > div > span",
  },
  contacts: {
    "e-mailAddress":
      "#js-settings-overview > div.b-settings-overview-contact > ul > li.b-settings-overview-contact-item.b-settings-overview-contact-email > a",
  },
};
export const getProfile = async (option) => {
  const browser = option.browser || (await createBrowser());
  const page = await createPage(browser);
  await page.goto(option.url, {
    waitUntil: "networkidle2",
  });
  await login(page, option.auth);
  const url = page.url();
  const profile = {
    url: url,
    about: await getNodeToString(page, userPageSelector.about),
    basicProfile: {
      displayName: await getNodeToString(
        page,
        userPageSelector.basicProfile.displayName
      ),
      name: {
        surName: await getNodeToString(
          page,
          userPageSelector.basicProfile.name.surName
        ),
        givenName: await getNodeToString(
          page,
          userPageSelector.basicProfile.name.givenName
        ),
      },
      yomigana: {
        surNameReading: await getNodeToString(
          page,
          userPageSelector.basicProfile.yomigana.surNameReading
        ),
        givenNameReading: await getNodeToString(
          page,
          userPageSelector.basicProfile.yomigana.givenNameReading
        ),
      },
      departments: await getNodesToStringsArray(
        page,
        userPageSelector.basicProfile.departments
      ),
      priorityDepartment: await getNodeToString(
        page,
        userPageSelector.basicProfile.priorityDepartment
      ),
      birthday: await getNodeToString(
        page,
        userPageSelector.basicProfile.birthday
      ),
      hireDate: await getNodeToString(
        page,
        userPageSelector.basicProfile.hireDate
      ),
      employeeID: await getNodeToString(
        page,
        userPageSelector.basicProfile.employeeID
      ),
      timeZone: await getNodeToString(
        page,
        userPageSelector.basicProfile.timeZone
      ),
      language: await getNodeToString(
        page,
        userPageSelector.basicProfile.language
      ),
    },
    contacts: {
      "e-mailAddress": await getNodeToString(
        page,
        userPageSelector.contacts["e-mailAddress"]
      ),
    },
  };
  if (option.browser) {
    await page.close();
  } else {
    await browser.close();
  }
  return profile;
};
