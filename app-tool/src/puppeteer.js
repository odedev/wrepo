import puppeteer from "puppeteer";

// 等待
export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  })
};

export async function page() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();


  const viewport = {
    // 横屏
    width: 1920,
    height: 1080,

    // 竖屏
    // width: 1920,
    // height: 2560,
  };

  await page.goto('http://36.138.58.51:2229/ppcgui/login-back.html');
  // Set screen size
  await page.setViewport(viewport);

  return page;
}







(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();


  const viewport = {
    // 横屏
    width: 1920,
    height: 1080,

    // 竖屏
    // width: 1920,
    // height: 2560,
  };



  const login = async () => {
    // Type into search box
    await page.type('.uname', 'admin');
    await page.type('.pword', '123');

    // // Wait and click on first result
    const searchResultSelector = '.btn.btn-success.btn-block';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);
  }

  const loginEnt = async () => {
    await page.type('input[type=text]', 'ui');
    await page.type('input[type=text]', 'ui');

  const menuTopList = await page.$$('a.my_menu_list');

  }

  // 关闭菜单标签页
  const closeMenuTab = async () => {
    try {
      const menuSelector = 'a.J_menuTab.active i';
      await page.waitForSelector(menuSelector, {timeout: 200});
      await page.click(menuSelector);
    } catch (error) {

    }
  }


  const screenshotBtnPage = async (title, name) => {
    const frames = page.frames();
    const frame = frames[frames.length - 1]
    // console.log(await frame.content())
    const editBtn = await frame.$(`a[title=${title}]`);
    if (editBtn) {
      await editBtn.click();
      await sleep(2000)
      await page.screenshot({path: `tool/image/${name || title}.png`});
    }
  };


  await page.goto('http://36.138.58.51:2229/ppcgui/login-back.html');
  // Set screen size
  await page.setViewport(viewport);


  await login();


  await sleep(4000);


  // const menuSelector = '.btn-primary.my_menu_list';
  // await page.waitForSelector(menuSelector);
  // await page.click(menuSelector);
  // await sleep(600)


  const menuTopList = await page.$$('a.my_menu_list');

  for (let i = 0; i < 1; i++) {
    let item = menuTopList[i];
    console.log(item)
    await item.click();
    await sleep(2000)

    const menuList = await page.$$('a.onelevel');
    for (let j = 0; j < menuList.length; j++) {
      let item = menuList[j];
      await item.click();
      await sleep(2000)
      await page.screenshot({path: `tool/screenshot/${i}-${j}-0-0.png`});

      const subMenuList = await page.$$('ul.nav-second-level.in a.twolevel');
      if (subMenuList.length === 0) {
        await closeMenuTab();

      }
      for (let k = 0; k < subMenuList.length; k++) {
        let item = subMenuList[k];

        const fullTitle = await item.evaluate(el => el.textContent);
        console.log(fullTitle)

        await item.click();
        await sleep(2000)
        await page.screenshot({path: `tool/screenshot/${i}-${j}-${k}.png`});


        await screenshotBtnPage('新增', `${i}-${j}-${k}`)

        // const frames = page.frames();
        // const frame = frames[frames.length - 1]
        // // console.log(await frame.content())
        // const editBtn = await frame.$('a[title=新增]');
        // console.log(editBtn)
        // if (editBtn) {
        //   await editBtn.click();
        //   await sleep(2000)
        //   await page.screenshot({path: `image/${i}-${j}-${k}-edit.png`});
        // }


        await closeMenuTab();


      }

      await item.click();

      await closeMenuTab();


    }
  }




  // const menuTopSelector = '.onelevel';
  // await page.waitForSelector(menuTopSelector);
  // await page.click(menuTopSelector);
  // await sleep(600)

  // const subMenuSelector = '.J_menuItem.twolevel';
  // await page.waitForSelector(subMenuSelector);
  // await page.click(subMenuSelector);

  // await sleep(3000)

  // await page.screenshot({path: 'example.png'});


  // Locate the full title with a unique string
  // const textSelector = await page.waitForSelector(
  //   'text/Customize and automate'
  // );
  // const fullTitle = await textSelector.evaluate(el => el.textContent);

  // // Print the full title
  // console.log('The title of this blog post is "%s".', fullTitle);

  // setTimeout(async () => {
  //   await page.screenshot({path: 'example.png'});

  //   await browser.close();

  // }, 12000)
  await browser.close();
})();



(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto('https://developer.chrome.com/');

  // Set screen size
  await page.setViewport({width: 1080, height: 1024});

  // Type into search box
  await page.type('.search-box__input', 'automate beyond recorder');

  // Wait and click on first result
  const searchResultSelector = '.search-box__link';
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    'text/Customize and automate'
  );
  const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
  console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
})();
