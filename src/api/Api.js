import axios from 'axios'
export const login_ = params => {
  return axios.post(`/v1/login/login`, params)
}
export const usermenu = params => {
  return axios.post(`/v1/menuopt/get_mob_menu`, params)
}
export const isLogin = params => {
  return axios.post(`/v1/index/index`, params)
}
export const inforlist = params => {
  return axios.post(`/v1/own/infor_list`, params)
}
// 首页统计
export const indexflow = params => {
  return axios.post(`/v1/index/index_flow`, params)
}
// 我的申请
export const mysheet = params => {
  return axios.post(`/v1/flow/mysheet`, params)
}
// 选择部门人员
export const deptuser = params => {
  return axios.post(`/v1/opt/get_deptuser_info`, params)
}
// 证书分类
export const certclass = params => {
  return axios.post(`/v1/cert/cert_class_list`, params)
}
// 证书列表
export const certlist = params => {
  return axios.post(`/v1/cert/cert_list`, params)
}
// 证书人员
export const personList = params => {
  return axios.post(`/v1/cert/person_list`, params)
}
//  文件柜
export const certboxlist = params => {
  return axios.post(`/v1/cert/cert_box_list`, params)
}
//  培训管理
export const trainlist = params => {
  return axios.post(`/v1/certtrain/train_list`, params)
}
// 出场管理
export const groundlist = params => {
  return axios.post(`/v1/certground/ground_list`, params)
}
// 证书借还
export const certborrowlist = params => {
  return axios.post(`/v1/cert/cert_borrow_list`, params)
}
// 合同信息
export const certcontractlist = params => {
  return axios.post(`/v1/cert/cert_contract_list`, params)
}
// 合同费用
export const certcoslist = params => {
  return axios.post(`/v1/cert/cert_cos_list`, params)
}
// 证书费用
export const certcostlist = params => {
  return axios.post(`/v1/cert/cert_cost_list`, params)
}
// 项目使用情况
export const certuseengin = params => {
  return axios.post(`/v1/cert/cert_useengin`, params)
}
// 投标使用
export const certusebid = params => {
  return axios.post(`/v1/cert/cert_usebid`, params)
}
// 证书详情
export const certshow = params => {
  return axios.post(`/v1/cert/cert_show`, params)
}
//  证书状态(公用)
export const getreadsandlog = params => {
  return axios.post(`/v1/opt/get_readsandlog`, params)
}
// 培训详情
export const trainshow = params => {
  return axios.post(`/v1/certtrain/train_show`, params)
}
// 出场管理详情
export const groundshow = params => {
  return axios.post(`/v1/certground/ground_show`, params)
}
// 证书借还详情
export const certborrowshow = params => {
  return axios.post(`/v1/cert/cert_borrow_show`, params)
}
// 审批流程
export const examinebill = params => {
  return axios.post(`/v1/opt/examine_bill`, params)
}
// 人员详情
export const personshow = params => {
  return axios.post(`/v1/cert/person_show`, params)
}
//  合同信息详情
export const certcontractshow = params => {
  return axios.post(`/v1/cert/cert_contract_show`, params)
}
// 证书合同费用
export const certcosshow = params => {
  return axios.post(`/v1/cert/cert_cos_show`, params)
}
export const certcostshow = params => {
  return axios.post(`v1/cert/cert_cost_show`, params)
}
// 证书即将过期
export const certexpirelist = params => {
  return axios.post(`v1/cert/certexpire_list`, params)
}
// 证书登记费用
export const certcostloglist = params => {
  return axios.post(`v1/cert/cert_cost_log_list`, params)
}
// 证书登记费用详情
export const certcostlogshow = params => {
  return axios.post(`v1/cert/cert_cost_log_show`, params)
}
// 费用结算
export const certcostsettlelist = params => {
  return axios.post(`v1/cert/cert_cost_settle_list`, params)
}
// 费用结算详情
export const certcostsettleshow = params => {
  return axios.post(`v1/cert/cert_cost_settle_show`, params)
}
// 证书首页
export const certindex = params => {
  return axios.post(`v1/cert/certindex`, params)
}
/**
 * ----------------------------------------投标-------------------------------------------------**/
// 投标保证金管理
export const bidbondlist = params => {
  return axios.post(`/v1/bid/bid_bond_list`, params)
}
// 投标保证金管理详情
export const bidbondshow = params => {
  return axios.post(`v1/bid/bid_bond_show`, params)
}
//  投标总结
export const bidsumlist = params => {
  return axios.post(`v1/bid/bid_sum_list`, params)
}
//  投标总结详情
export const bidsumshow = params => {
  return axios.post(`v1/bid/bid_sum_show`, params)
}
// 合作企业管理
export const bidcooperationlist = params => {
  return axios.post(`v1/bid/bid_cooperation_list`, params)
}
// 合作企业管理详情
export const bidcooperationshow = params => {
  return axios.post(`v1/bid/bid_cooperation_show`, params)
}
// 投标信息
export const bidlists = params => {
  return axios.post(`v1/bid/bid_list`, params)
}
// 投标信息详情
export const bidshow = params => {
  return axios.post(`v1/bid/bid_show`, params)
}
//  投标任务
export const bidworklist = params => {
  return axios.post(`v1/bid/bid_work_list`, params)
}
//  投标任务
export const bidworkshow = params => {
  return axios.post(`v1/bid/bid_work_show`, params)
}
//  投标费用
export const bidcoslist = params => {
  return axios.post(`v1/bid/bid_cos_list`, params)
}
//  投标费用详情
export const bidcosshow = params => {
  return axios.post(`v1/bid/bid_cos_show`, params)
}
/**
 * ----------------------------------------------------------智查询----------------------------------------------------**/
//  查人员
export const searchusercert = params => {
  return axios.post(`v1/oadata/search_usercert`, params)
}
//  查人员详情
export const usershow = params => {
  return axios.post(`v1/oadata/user_show`, params)
}
//  查企业
export const searchcompany = params => {
  return axios.post(`v1/oadata/search_company`, params)
}
//  查企业详情
export const companyshow = params => {
  return axios.post(`v1/oadata/company_show`, params)
}
// 企业资质
export const comcertlist = params => {
  return axios.post(`v1/oadata/comcert_list`, params)
}
// 企业注册人员
export const usercertlist = params => {
  return axios.post(`v1/oadata/usercert_list`, params)
}
// 企业工程业绩
export const proachievelist = params => {
  return axios.post(`v1/oadata/pro_achieve_list`, params)
}
// 企业资质
export const searchquality = params => {
  return axios.post(`v1/oadata/search_quality`, params)
}
// 高级查
export const searchprosenior = params => {
  return axios.post(`v1/oadata/search_pro_senior`, params)
}
// 综合查询
export const searchmultiple = params => {
  return axios.post(`v1/oadata/search_multiple`, params)
}
// 综合查询
export const searchprosimple = params => {
  return axios.post(`v1/oadata/search_pro_simple`, params)
}
/**
 * **********************************************************项目************************************************************/
// 项目立项
export const enginlist = params => {
  return axios.post(`v1/engin/engin_list`, params)
}
// 项目立项详情
export const enginshow = params => {
  return axios.post(`v1/engin/engin_show`, params)
}
// 进度填报
export const enginspeedlist = params => {
  return axios.post(`v1/engin/engin_speed_list`, params)
}
// 进度填报详情
export const enginspeedshow = params => {
  return axios.post(`v1/engin/engin_speed_show`, params)
}
// 支出计划
export const enginpayplanlist = params => {
  return axios.post(`v1/engin/engin_payplan_list`, params)
}
// 支出计划详情
export const enginpayplanshow = params => {
  return axios.post(`v1/engin/engin_payplan_show`, params)
}
// 收入合同
export const incomecontractlist = params => {
  return axios.post(`v1/income/income_contract_list`, params)
}
// 收入合同详情
export const incomecontractshow = params => {
  return axios.post(`v1/income/income_contract_show`, params)
}
// 合同收款
export const incomecollectlist = params => {
  return axios.post(`v1/income/income_collect_list`, params)
}
// 合同收款详情
export const incomecollectshow = params => {
  return axios.post(`v1/income/income_collect_show`, params)
}
// 进度款申报
export const incomeprogresslist = params => {
  return axios.post(`v1/income/income_progress_list`, params)
}
// 进度款申报详情
export const incomeprogressshow = params => {
  return axios.post(`v1/income/income_progress_show`, params)
}
// 完工结算
export const incomefinishlist = params => {
  return axios.post(`v1/income/income_finish_list`, params)
}
// 完工结算详情
export const incomefinishshow = params => {
  return axios.post(`v1/income/income_finish_show`, params)
}
// 合同变更
export const incomemodifylist = params => {
  return axios.post(`v1/income/income_modify_list`, params)
}
// 合同变更详情
export const incomemodifyshow = params => {
  return axios.post(`v1/income/income_modify_show`, params)
}
// 材料总计划
export const stuffplanlist = params => {
  return axios.post(`v1/stuff/stuff_plan_list`, params)
}
// 材料总计划详情
export const stuffplanshow = params => {
  return axios.post(`v1/stuff/stuff_plan_show`, params)
}
//  合同材料
export const stuffcontractlist = params => {
  return axios.post(`v1/stuff/stuff_contract_list`, params)
}
//  合同材料详情
export const stuffcontractshow = params => {
  return axios.post(`v1/stuff/stuff_contract_show`, params)
}
//  材料入库
export const stuffintoroomlist = params => {
  return axios.post(`v1/stuff/stuff_intoroom_list`, params)
}
//  材料入库详情
export const stuffintoroomshow = params => {
  return axios.post(`v1/stuff/stuff_intoroom_show`, params)
}
//  材料结算
export const stuffsettlelist = params => {
  return axios.post(`v1/stuff/stuff_settle_list`, params)
}
//  材料结算详情
export const stuffsettleshow = params => {
  return axios.post(`v1/stuff/stuff_settle_show`, params)
}
//  材料出库
export const stuffoutroomlist = params => {
  return axios.post(`v1/stuff/stuff_outroom_list`, params)
}
//  材料出库详情
export const stuffoutroomshow = params => {
  return axios.post(`v1/stuff/stuff_outroom_show`, params)
}
export const stuffinventoryshow = params => {
  return axios.post(`v1/stuff/stuff_inventory_show`, params)
}
//  材料付款
export const stuffpaymentlist = params => {
  return axios.post(`v1/stuff/stuff_payment_list`, params)
}
//  材料付款详情
export const stuffpaymentshow = params => {
  return axios.post(`v1/stuff/stuff_payment_show`, params)
}
//  材料盘点
export const stuffinventorylist = params => {
  return axios.post(`v1/stuff/stuff_inventory_list`, params)
}

//  材料退库
export const stufftuiroomlist = params => {
  return axios.post(`v1/stuff/stuff_tuiroom_list`, params)
}
//  材料退库详情
export const stufftuiroomshow = params => {
  return axios.post(`v1/stuff/stuff_tuiroom_show`, params)
}
//  材料调拨
export const stuffallocationlist = params => {
  return axios.post(`v1/stuff/stuff_allocation_list`, params)
}
//  材料调拨详情
export const stuffallocationshow = params => {
  return axios.post(`v1/stuff/stuff_allocation_show`, params)
}
//  库存期初
export const stuffearlylist = params => {
  return axios.post(`v1/stuff/stuff_early_list`, params)
}
//  库存期初详情
export const stuffearlyshow = params => {
  return axios.post(`v1/stuff/stuff_early_show`, params)
}
//  劳务合同
export const labourcontractlist = params => {
  return axios.post(`v1/labour/labour_contract_list`, params)
}
//  劳务合同详情
export const labourcontractshow = params => {
  return axios.post(`v1/labour/labour_contract_show`, params)
}
//  进度款申报
export const labourprogresslist = params => {
  return axios.post(`v1/labour/labour_progress_list`, params)
}
//  进度款申报详情
export const labourprogressshow = params => {
  return axios.post(`v1/labour/labour_progress_show`, params)
}
//  劳务付款
export const labourpaymentlist = params => {
  return axios.post(`v1/labour/labour_payment_list`, params)
}
//  劳务付款详情
export const labourpaymentshow = params => {
  return axios.post(`v1/labour/labour_payment_show`, params)
}
//  完工结算
export const labourfinishlist = params => {
  return axios.post(`v1/labour/labour_finish_list`, params)
}
//  完工结算详情
export const labourfinishshow = params => {
  return axios.post(`v1/labour/labour_finish_show`, params)
}
//  零星劳务单
export const laboursporadiclist = params => {
  return axios.post(`v1/labour/labour_sporadic_list`, params)
}
//  零星劳务单详情
export const laboursporadicshow = params => {
  return axios.post(`v1/labour/labour_sporadic_show`, params)
}
//  分包合同
export const subpackcontractlis = params => {
  return axios.post(`v1/subpack/subpack_contract_list`, params)
}
//  分包合同详情
export const subpackcontractshow = params => {
  return axios.post(`v1/subpack/subpack_contract_show`, params)
}
//  精度款申报
export const subpackprogresslist = params => {
  return axios.post(`v1/subpack/subpack_progress_list`, params)
}
//  精度款申报详情
export const subpackprogressshow = params => {
  return axios.post(`v1/subpack/subpack_progress_show`, params)
}
//  分包付款
export const subpackpaymentlist = params => {
  return axios.post(`v1/subpack/subpack_payment_list`, params)
}
//  分包付款详情
export const subpackpaymentshow = params => {
  return axios.post(`v1/subpack/subpack_payment_show`, params)
}
//  完工结算
export const subpackfinishlist = params => {
  return axios.post(`v1/subpack/subpack_finish_list`, params)
}
//  完工结算详情
export const subpackfinishshow = params => {
  return axios.post(`v1/subpack/subpack_finish_show`, params)
}
//  租赁计划
export const leaseplanlist = params => {
  return axios.post(`v1/lease/lease_plan_list`, params)
}
//  租赁计划详情
export const leaseplanshow = params => {
  return axios.post(`v1/lease/lease_plan_show`, params)
}
//  租赁合同
export const leasecontractlist = params => {
  return axios.post(`v1/lease/lease_contract_list`, params)
}
//  租赁合同详情
export const leasecontractshow = params => {
  return axios.post(`v1/lease/lease_contract_show`, params)
}
//  租赁付款
export const leasepaymentlist = params => {
  return axios.post(`v1/lease/lease_payment_list`, params)
}
//  租赁付款详情
export const leasepaymentshow = params => {
  return axios.post(`v1/lease/lease_payment_show`, params)
}
//  租赁结算
export const leasesettlelist = params => {
  return axios.post(`v1/lease/lease_settle_list`, params)
}
//  租赁结算详情
export const leasesettleshow = params => {
  return axios.post(`v1/lease/lease_settle_show`, params)
}
//  租赁进场
export const leaseintolist = params => {
  return axios.post(`v1/lease/lease_into_list`, params)
}
//  租赁进场详情
export const leaseintoshow = params => {
  return axios.post(`v1/lease/lease_into_show`, params)
}
//  租赁退场
export const leaseoutlist = params => {
  return axios.post(`v1/lease/lease_out_list`, params)
}
//  租赁退场详情
export const leaseoutshow = params => {
  return axios.post(`v1/lease/lease_out_show`, params)
}
//  开/收票登记
export const engininvoicelist = params => {
  return axios.post(`v1/engin/engin_invoice_list`, params)
}
//  开/收票登记详情
export const engininvoiceshow = params => {
  return axios.post(`v1/engin/engin_invoice_show`, params)
}
//  仓库信息
export const engindepotlist = params => {
  return axios.post(`v1/engin/engin_depot_list`, params)
}
// 材料信息分类
export const enginstufftypelist = params => {
  return axios.post(`v1/engin/engin_stuff_type_list`, params)
}
// 材料信息
export const enginstufflist = params => {
  return axios.post(`v1/engin/engin_stuff_list`, params)
}
// 材料信息详情
export const enginstuffshow = params => {
  return axios.post(`v1/engin/engin_stuff_show`, params)
}
// 设备信息
export const engindevicelist = params => {
  return axios.post(`v1/engin/engin_device_list`, params)
}
// 设备信息详情
export const engindeviceshow = params => {
  return axios.post(`v1/engin/engin_device_show`, params)
}
// 施工日志
export const conprocessbuildloglist = params => {
  return axios.post(`v1/conprocess/conprocess_buildlog_list`, params)
}
// 施工日志详情
export const conprocessbuildlogshow = params => {
  return axios.post(`v1/conprocess/conprocess_buildlog_show`, params)
}
// 设计变更
export const conprocessdesignlist = params => {
  return axios.post(`v1/conprocess/conprocess_design_list`, params)
}
// 设计变更详情
export const conprocessdesignshow = params => {
  return axios.post(`v1/conprocess/conprocess_design_show`, params)
}
// 技术交底
export const conprocesstechnicallist = params => {
  return axios.post(`v1/conprocess/conprocess_technical_list`, params)
}
// 技术交底详情
export const conprocesstechnicalshow = params => {
  return axios.post(`v1/conprocess/conprocess_technical_show`, params)
}
// 施工组织方案
export const conprocessschemelist = params => {
  return axios.post(`v1/conprocess/conprocess_scheme_list`, params)
}
// 施工组织方案详情
export const conprocessschemeshow = params => {
  return axios.post(`v1/conprocess/conprocess_scheme_show`, params)
}
// 安全日志/检查
export const enginsafetylist = params => {
  return axios.post(`v1/engin/engin_safety_list`, params)
}
// 安全日志/检查详情
export const enginsafetyshow = params => {
  return axios.post(`v1/engin/engin_safety_show`, params)
}
// 质量/整改巡检
export const enginqualitylist = params => {
  return axios.post(`v1/engin/engin_quality_list`, params)
}
// 质量巡检/整改详情
export const enginqualityshow = params => {
  return axios.post(`v1/engin/engin_quality_show`, params)
}
// 设备需求计划
export const deviceplanlist = params => {
  return axios.post(`v1/device/device_plan_list`, params)
}
// 设备需求计划详情
export const deviceplanshow = params => {
  return axios.post(`v1/device/device_plan_show`, params)
}
// 设备领取
export const devicereceivelist = params => {
  return axios.post(`v1/device/device_receive_list`, params)
}
// 设备领取详情
export const devicereceiveshow = params => {
  return axios.post(`v1/device/device_receive_show`, params)
}
// 设备检查
export const deviceinspectlist = params => {
  return axios.post(`v1/device/device_inspect_list`, params)
}
// 设备检查详情
export const deviceinspectshow = params => {
  return axios.post(`v1/device/device_inspect_show`, params)
}
// 设备油耗
export const deviceoillist = params => {
  return axios.post(`v1/device/device_oil_list`, params)
}
// 设备油耗详情
export const deviceoilshow = params => {
  return axios.post(`v1/device/device_oil_show`, params)
}
// 设备维修/维保
export const devicerepairlist = params => {
  return axios.post(`v1/device/device_repair_list`, params)
}
// 设备维修/维保详情
export const devicerepairshow = params => {
  return axios.post(`v1/device/device_repair_show`, params)
}
// 自有设备采购合同
export const deviceowncontratlist = params => {
  return axios.post(`v1/device/deviceown_contrat_list`, params)
}
// 自有设备采购合同详情
export const deviceowncontratshow = params => {
  return axios.post(`v1/device/deviceown_contrat_show`, params)
}
// 自有设备采购
export const deviceownbuylist = params => {
  return axios.post(`v1/device/deviceown_buy_list`, params)
}
// 自有设备采购详情
export const deviceownbuyshow = params => {
  return axios.post(`v1/device/deviceown_buy_show`, params)
}
// 自有设备调拨
export const deviceownallocationlist = params => {
  return axios.post(`v1/device/deviceown_allocation_list`, params)
}
// 自有设备调拨详情
export const deviceownallocationshow = params => {
  return axios.post(`v1/device/deviceown_allocation_show`, params)
}
// 自有设备折旧
export const deviceowndeprecialist = params => {
  return axios.post(`v1/device/deviceown_deprecia_list`, params)
}
// 自有设备折旧详情
export const deviceowndepreciashow = params => {
  return axios.post(`v1/device/deviceown_deprecia_show`, params)
}
// 自有设备报废
export const deviceownscraplist = params => {
  return axios.post(`v1/device/deviceown_scrap_list`, params)
}
// 自有设备报废详情
export const deviceownscrapshow = params => {
  return axios.post(`v1/device/deviceown_scrap_show`, params)
}
// 项目看板
export const enginindexcount = params => {
  return axios.post(`v1/engin/enginindex_count`, params)
}
/**
 * ********************************************************************************个人办公***********************************************************************************************************/
// 邮件
export const emailmlist = params => {
  return axios.post(`v1/own/emailm_list`, params)
}
// 发送邮件
export const addemailm = params => {
  return axios.post(`v1/own/add_emailm`, params)
}
// 邮件详情
export const emailmshow = params => {
  return axios.post(`v1/own/emailm_show`, params)
}
// 部门人员选择
export const getdeptuserinfo = params => {
  return axios.post(`v1/opt/get_deptuser_info`, params)
}
// // 公告通知
// export const inforlist = params => {
//   return axios.post(`v1/own/infor_list`, params)
// }
// 公告通知
export const inforshow = params => {
  return axios.post(`v1/own/infor_show`, params)
}
// 日程
export const schedulepage = params => {
  return axios.post(`v1/own/schedule_page`, params)
}
// 提醒信息
export const todolist = params => {
  return axios.post(`v1/own/todo_list`, params)
}
// 单据提醒
export const flowtodoslist = params => {
  return axios.post(`v1/own/flow_todos_list`, params)
}
// 今日会议
export const meetlist = params => {
  return axios.post(`v1/ownmeet/meet_list`, params)
}
// 今日会议详情
export const meetshow = params => {
  return axios.post(`v1/ownmeet/meet_show`, params)
}
// 会议室
export const meetviewlist = params => {
  return axios.post(`v1/ownmeet/meet_view_list`, params)
}
// 会议室
export const gethyname = params => {
  return axios.post(`v1/ownmeet/get_hyname`, params)
}
// 工作日报
export const dailymylist = params => {
  return axios.post(`v1/owndaily/dailymy_list`, params)
}
// 工作日报
export const dailymyshow = params => {
  return axios.post(`v1/owndaily/dailymy_show`, params)
}
/**
 * ****************************************************************************流程******************************************************************************/
// 待办
export const handle = params => {
  return axios.post(`v1/flow/handle`, params)
}
// 经我处理
export const handleold = params => {
  return axios.post(`v1/flow/handle_old`, params)
}
// 我的下属申请
export const branch = params => {
  return axios.post(`v1/flow/branch`, params)
}
/**
 * **************************************************************************任务***********************************************************/
// 我的任务
export const worklist = params => {
  return axios.post(`v1/taskwork/work_list`, params)
}
// 我的任务详情
export const workshow = params => {
  return axios.post(`v1/taskwork/work_show`, params)
}
// 我执行的项目
export const projectlist = params => {
  return axios.post(`v1/taskproject/project_list`, params)
}
// 项目详情
export const projectshow = params => {
  return axios.post(`v1/taskproject/project_show`, params)
}
/**
 * 人事
 * **********************************************************************************/
// 人员档案
export const archivelist = params => {
  return axios.post(`v1/Personarchive/archive_list`, params)
}
// 人员档案详情
export const archiveshow = params => {
  return axios.post(`v1/personarchive/archive_show`, params)
}
//  //员工合同列表
export const userractlist = params => {
  return axios.post(`v1/personarchive/userract_list`, params)
}
//  转正申请列表
export const hrpositivelist = params => {
  return axios.post(`v1/personmanage/hrpositive_list`, params)
}
// 离职申请列表
export const hrredundlist = params => {
  return axios.post(`v1/personmanage/hrredund_list`, params)
}
//  //调薪申请列表
export const hrtrsalarylist = params => {
  return axios.post(`v1/personmanage/hrtrsalary_list`, params)
}
// 职位调动列表
export const hrtransferlist = params => {
  return axios.post(`v1/personmanage/hrtransfer_list`, params)
}
// 员工合同详情
export const userractshow = params => {
  return axios.post(`v1/personarchive/userract_show`, params)
}
// 人员需求
export const hrdemintlist = params => {
  return axios.post(`v1/personmanage/hrdemint_list`, params)
}
// 人员需求详情
export const hrdemintshow = params => {
  return axios.post(`v1/personmanage/hrdemint_show`, params)
}
// 面试安排
export const hrdemintviewlist = params => {
  return axios.post(`v1/personmanage/hrdemint_view_list`, params)
}
// 面试安排详情
export const hrdemintviewshow = params => {
  return axios.post(`v1/personmanage/hrdemint_view_show`, params)
}
// 转正申请详情
export const hrpositiveshow = params => {
  return axios.post(`v1/personmanage/hrpositive_show`, params)
}
// 离职申请详情
export const hrredundshow = params => {
  return axios.post(`v1/personmanage/hrredund_show`, params)
}
// 人事调动详情
export const hrtransfershow = params => {
  return axios.post(`v1/personmanage/hrtransfer_show`, params)
}
// 调薪申请详情
export const hrtrsalaryshow = params => {
  return axios.post(`v1/personmanage/hrtrsalary_show`, params)
}
// 所有日报
export const dailylist = params => {
  return axios.post(`v1/persondaily/daily_list`, params)
}
// 所有日报详情
export const dailyshow = params => {
  return axios.post(`v1/persondaily/daily_show`, params)
}
// 工资管理
export const wageslist = params => {
  return axios.post(`v1/personwages/wages_list`, params)
}
// 工资管理详情
export const wagesshow = params => {
  return axios.post(`v1/personwages/wages_show`, params)
}
/**
 * 行政
 * **************************************************************************/
// 仓库管理
export const godepotlist = params => {
  return axios.post(`v1/admingoodsbase/godepot_list`, params)
}
// 仓库详情
export const godepotshow = params => {
  return axios.post(`v1/admingoodsbase/godepot_show`, params)
}
// 供应商管理
export const customerlist = params => {
  return axios.post(`v1/admingoodsbase/customer_list`, params)
}
// 供应商管理详情
export const customershow = params => {
  return axios.post(`v1/admingoodsbase/customer_show`, params)
}
// 物品列表
export const goodstypelist = params => {
  return axios.post(`v1/admingoodsbase/goodstype_list`, params)
}
export const goodslist = params => {
  return axios.post(`v1/admingoodsbase/goods_list`, params)
}
// 物品列表详情
export const goodsshow = params => {
  return axios.post(`v1/admingoodsbase/goods_show`, params)
}
// 出入库
export const billlist = params => {
  return axios.post(`v1/admingoods/bill_list`, params)
}
// 出入库详情
export const goodsslist = params => {
  return axios.post(`v1/admingoods/goodss_list`, params)
}
// 物品采购
export const goodmlist = params => {
  return axios.post(`v1/admingoods/goodm_list`, params)
}
// 物品采购详情
export const goodmshow = params => {
  return axios.post(`v1/admingoods/goodm_show`, params)
}
// 物品领用
export const goodmuselist = params => {
  return axios.post(`v1/admingoods/goodmuse_list`, params)
}
// 物品领用详情
export const goodmuseshow = params => {
  return axios.post(`v1/admingoods/goodmuse_show`, params)
}
// 物品调拨
export const goodmcalllist = params => {
  return axios.post(`v1/admingoods/goodmcall_list`, params)
}
// 物品调拨详情
export const goodmcallshow = params => {
  return axios.post(`v1/admingoods/goodmcall_show`, params)
}
// 物品盘点
export const goodmsslist = params => {
  return axios.post(`v1/admingoods/goodmss_list`, params)
}
// 固定资产
export const assetmtypelist = params => {
  return axios.post(`v1/adminassetm/assetmtype_list`, params)
}
export const assetmlist = params => {
  return axios.post(`v1/adminassetm/assetm_list`, params)
}
// 固定资产详情
export const assetmshow = params => {
  return axios.post(`v1/adminassetm/assetm_show`, params)
}
// 费用报销
export const fininfomlist = params => {
  return axios.post(`v1/fininfom/fininfom_list`, params)
}
// 费用报销详情
export const fininfomshow = params => {
  return axios.post(`v1/fininfom/fininfom_show`, params)
}
// 付款申请
export const paymentlist = params => {
  return axios.post(`v1/fininfom/payment_list`, params)
}
// 付款申请详情
export const paymentshow = params => {
  return axios.post(`v1/fininfom/payment_show`, params)
}
// 印章证照列表
export const seallist = params => {
  return axios.post(`v1/Adminseal/seal_list`, params)
}
// 印章证照列表详情
export const sealshow = params => {
  return axios.post(`v1/adminseal/seal_show`, params)
}
// 印章证照使用
export const sealapllist = params => {
  return axios.post(`v1/Adminseal/sealapl_list`, params)
}
// 印章证照使用详情
export const sealaplshow = params => {
  return axios.post(`v1/adminseal/sealapl_show`, params)
}
// 合同档案管理
export const managecontractlist = params => {
  return axios.post(`v1/archivesmanage/managecontract_list`, params)
}
// 合同档案管理详情
export const managecontractshow = params => {
  return axios.post(`v1/archivesmanage/managecontract_show`, params)
}
// 文件档案管理
export const managefilelist = params => {
  return axios.post(`v1/archivesmanage/managefile_list`, params)
}
// 文件档案管理详情
export const managefileshow = params => {
  return axios.post(`v1/archivesmanage/managefile_show`, params)
}
/**
 *
 * **************************************************客户***********************************/
// 客户公海库
export const consumerlist = params => {
  return axios.post(`v1/consumer/consumer_list`, params)
}
// 客户详情
export const consumershow = params => {
  return axios.post(`v1/consumer/consumer_show`, params)
}
// 客户分配
export const allotlist = params => {
  return axios.post(`v1/consumer/allot_list`, params)
}
// 我的合同
export const custractlist = params => {
  return axios.post(`v1/consumer/custract_list`, params)
}
// 我的合同
export const custractshow = params => {
  return axios.post(`v1/consumer/custract_show`, params)
}
// 我的收款单
export const custfinalist = params => {
  return axios.post(`v1/consumer/custfina_list`, params)
}
// 我的收款单详情
export const custfinashow = params => {
  return axios.post(`v1/consumer/custfina_show`, params)
}
/**
 *
 *
 * ***************************************************************财务****************************************************/
// 银行信息
export const banklist = params => {
  return axios.post(`v1/finance/bank_list`, params)
}
// 银行信息详情
export const bankshow = params => {
  return axios.post(`v1/finance/bank_show`, params)
}
// 单位往来
// 分类
export const dealcomtypelist = params => {
  return axios.post(`v1/finance/dealcom_type_list`, params)
}
// 列表
export const dealcomlist = params => {
  return axios.post(`v1/finance/dealcom_list`, params)
}
// 单位往来详情
export const dealcomshow = params => {
  return axios.post(`v1/finance/dealcom_show`, params)
}
// //
// export const certcoslist = params => {
//   return axios.post(`v1/cert/cert_cos_list`, params)
// }
/**
 * ****************************************************************************************/
// 获取项目列表
export const getenginproject = params => {
  return axios.post(`v1/opt/get_engin_project`, params)
}
export const addenginspeed = params => {
  return axios.get(`v1/engin/add_engin_speed`, {params: params})
}
export const addenginspeedpost = params => {
  return axios.post(`v1/engin/add_engin_speed`, params)
}
// 文件上传
export const uploadfile = params => {
  return axios.post(`v1/opt/upload_file`, params)
}
// 施工日志
export const addconprocessbuildlog = params => {
  return axios.get(`v1/conprocess/add_conprocess_buildlog`, {params: params})
}
// 施工日志添加
export const addconprocessbuildlogpost = params => {
  return axios.post(`v1/conprocess/add_conprocess_buildlog`, params)
}
// 安全日志
export const addenginsafety = params => {
  return axios.get(`v1/engin/add_engin_safety`, {params: params})
}
export const addenginsafetypost = params => {
  return axios.post(`v1/engin/add_engin_safety`, params)
}
/**
 * ******************************************首页公告通知*********************************************************/
/**
 * *******************************************请假****************************************/
export const addkqinfoqj = params => {
  return axios.get(`v1/own/add_kqinfoqj`, {params: params})
}
export const addkqinfoqjpost = params => {
  return axios.post(`v1/own/add_kqinfoqj`, params)
}
// 请假详情
export const kqinfoqjshow = params => {
  return axios.post(`v1/own/kqinfoqj_show`, params)
}
// 用户详情
export const systembaseusershow = params => {
  return axios.post(`v1/systembase/user_show`, params)
}
/**
 * ****************************************************加班***********************************/
export const addkqinfojb = params => {
  return axios.get(`v1/own/add_kqinfojb`, {params: params})
}
export const addkqinfojbpost = params => {
  return axios.post(`v1/own/add_kqinfojb`, params)
}
// 加班详情
export const kqinfojbshow = params => {
  return axios.post(`v1/own/kqinfojb_show`, params)
}
/**
 * **************************外出出差********************************/
export const addkqout = params => {
  return axios.get(`v1/own/add_kqout`, {params: params})
}
export const addkqoutpost = params => {
  return axios.post(`v1/own/add_kqout`, params)
}
export const kqoutshow = params => {
  return axios.post(`v1/own/kqout_show`, params)
}
/**
 * *************************************我的质料************************************/
export const edituserinfo = params => {
  return axios.get(`v1/own/edit_userinfo`, {params: params})
}
export const edituserinfopost = params => {
  return axios.post(`v1/own/edit_userinfo`, params)
}
// 内部通讯
export const deptlist = params => {
  return axios.post(`v1/systembase/dept_list`, params)
}
export const insidemessage = params => {
  return axios.post(`v1/own/inside_message`, params)
}
/**
 * *******************************************注册******************************************************/
// export const sendmessage = params => {
//   return axios.post(`v1/apply/sendmessage`, params)
// }
// export const applyindex = params => {
//   return axios.post(`v1/apply/index`, params)
// }
