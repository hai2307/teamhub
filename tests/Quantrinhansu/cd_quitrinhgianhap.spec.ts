import { test, expect } from '@playwright/test'
import { loginpage } from '../../page/loginpage';
import {cd_quytrinhgianhap} from '../../page/cd_quitrinhgianhap';


test.beforeEach(async({page})=>{
    const   Loginhrm = new loginpage(page)
    const   CD_quitrinhgianhap = new cd_quytrinhgianhap(page)
    await   Loginhrm.login()
    await   Loginhrm.sidebar_expand()
    await   CD_quitrinhgianhap.gotoCaidat_quitrinhgianhap()
 
})
test.afterEach(async ({page})=>{
    await   page.pause()
})

 test('Gid' , async({page})=>{
    // check danh sách chức năng
    const   CD_quitrinhgianhap = new cd_quytrinhgianhap(page)
    await   CD_quitrinhgianhap.checklistchucnang()
    // check defaul ban dau 
    await   CD_quitrinhgianhap.defaulbandau()
    await   CD_quitrinhgianhap.checkdata()
 });