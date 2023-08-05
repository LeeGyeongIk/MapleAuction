const { By, Key, Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let search_items = async() => { // 무기
    // let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless().addArguments("--disable-gpu", "window-size=1920x1080", "lang=ko_KR")).build();
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get('https://xn--hz2b1j494a9mhnwh.com/?s=5');
    await driver.executeScript('arguments[0].className = "collapse show"', driver.findElement(By.xpath('//*[@id="collapseWeapon"]')));
    await driver.findElement(By.xpath('//*[@id="weapon_name_input"]')).sendKeys('앱솔랩스');
    await driver.findElement(By.xpath('//*[@id="weapon_star_min_input"]')).sendKeys('22');
    await driver.findElement(By.xpath('//*[@id="weapon_potential_select"]')).sendKeys('레전드리', Key.RETURN);
    await driver.executeScript("arguments[0].click();", driver.findElement(By.xpath('//*[@id="weapon_or_radio"]')));
};

search_items();