import { test, expect } from '@playwright/test'
import { loginpage } from '../../page/loginpage';
import {cd_loaihopdong} from '../../page/cd_loaihopdong';


test.beforeEach(async({page})=>{
    const   Loginhrm = new loginpage(page)
    const   CD_loaihopdong = new cd_loaihopdong(page)
    await   Loginhrm.login()
    await   Loginhrm.sidebar_expand()
    await   CD_loaihopdong.gotoCaidat_lhd()
 
})
test.afterEach(async ({page})=>{
    await   page.pause()
})

 test('search' , async({page})=>{
    const   CD_loaihopdong = new cd_loaihopdong(page)
    // kiem tra placholder
    await   CD_loaihopdong.Searchinputtext('   ')
    await   CD_loaihopdong.Searchinputtext('hehe')

 });