import { test, expect } from '@playwright/test'
import { loginpage } from '../../page/loginpage';
import {cd_quytrinhnghiviec} from   '../../page/cd_quytrinhnghiviec';


test.beforeEach(async({page})=>{
    const   Loginhrm = new loginpage(page)
    const   CD_quitrinhnghiviec = new cd_quytrinhnghiviec(page)
    await   Loginhrm.login()
    await   Loginhrm.sidebar_expand()
    await   CD_quitrinhnghiviec.gotoCaidat_quitrinhnghiviec()
 
})
test.afterEach(async ({page})=>{
    await   page.pause()
})

 test('Gid' , async({page})=>{
    // check danh sách chức năng
    const   CD_quitrinhnghiviec = new cd_quytrinhnghiviec(page)
    await   CD_quitrinhnghiviec.checklistchucnang()
    // check defaul ban dau 
    await   CD_quitrinhnghiviec.defaulbandau()
    await   CD_quitrinhnghiviec.checkdata()
 });