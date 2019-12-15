import Vue from 'vue'
import Router from 'vue-router'
/**
 * // import Engin from '@/components/object/engin/Engin'
// import Engindetails from '@/components/object/engin/Engindetails'
// import Enginspeed from '@/components/object/enginspeed/Enginspeed'
// import Enginspeeddetails from '@/components/object/enginspeed/Enginspeeddetails'
// import Enginpayplan from '@/components/object/enginpayplan/Enginpayplan'
// import Enginpayplandetails from '@/components/object/enginpayplan/enginpayplandetails'
// import Incomecontract from '@/components/object/income/Incomecontract'
// import Incomecontractdetails from '@/components/object/income/Incomecontractdetails'
// import Incomecollect from '@/components/object/income/Incomecollect'
// import Incomecollectdetails from '@/components/object/income/Incomecollectdetails'
// import Incomeprogress from '@/components/object/income/Incomeprogress'
// import Incomeprogressdetails from '@/components/object/income/Incomeprogressdetails'
// import Incomefinish from '@/components/object/income/Incomefinish'
// import Incomefinishdetails from '@/components/object/income/Incomefinishdetails'
// import Incomemodify from '@/components/object/income/Incomemodify'
// import Incomemodifydetails from '@/components/object/income/Incomemodifydetails'
// import Stuffplan from '@/components/object/stuff/Stuffplan'
// import Stuffplandetails from '@/components/object/stuff/Stuffplandetails'
// import Stuffneedplan from '@/components/object/stuff/Stuffneedplan'
// import Stuffneedplandetails from '@/components/object/stuff/Stuffneedplandetails'
// import Stuffcontract from '@/components/object/stuff/Stuffcontract'
// import Stuffcontractdetails from '@/components/object/stuff/Stuffcontractdetails'
// import Stuffintoroom from '@/components/object/stuff/Stuffintoroom'
// import Stuffintoroomdetails from '@/components/object/stuff/Stuffintoroomdetails'
// import Stuffsettle from '@/components/object/stuff/Stuffsettle'
// import Stuffsettledetails from '@/components/object/stuff/Stuffsettledetails'
// import Stuffoutroom from '@/components/object/stuff/Stuffoutroom'
// import Stuffoutroomdetails from '@/components/object/stuff/Stuffoutroomdetails'
// import Stuffpayment from '@/components/object/stuff/Stuffpayment'
// import Stuffpaymentdetails from '@/components/object/stuff/Stuffpaymentdetails'
// import Stufftuiroom from '@/components/object/stuff/Stufftuiroom'
// import Stuffinventory from '@/components/object/stuff/Stuffinventory'
// import Stuffinventorydetails from '@/components/object/stuff/Stuffinventorydetails'
// import Stufftuiroomdetails from '@/components/object/stuff/Stufftuiroomdetails'
// import Stuffallocation from '@/components/object/stuff/Stuffallocation'
// import Stuffallocationdetails from '@/components/object/stuff/Stuffallocationdetails'
// import Stuffearly from '@/components/object/stuff/Stuffearly'
// import Stuffearlydetails from '@/components/object/stuff/Stuffearlydetails'
// import Labourcontract from '@/components/object/labour/Labourcontract'
// import Labourcontractdetails from '@/components/object/labour/Labourcontractdetails'
// import Labourprogress from '@/components/object/labour/Labourprogress'
// import Labourprogressdetails from '@/components/object/labour/Labourprogressdetails'
// import Labourpayment from '@/components/object/labour/Labourpayment'
// import Labourpaymentdetails from '@/components/object/labour/Labourpaymentdetails'
// import Labourfinish from '@/components/object/labour/Labourfinish'
// import Labourfinishdetails from '@/components/object/labour/Labourfinishdetails'
// import Laboursporadic from '@/components/object/labour/Laboursporadic'
// import Laboursporadicdetails from '@/components/object/labour/Laboursporadicdetails'
// import Subpackcontract from '@/components/object/subpack/Subpackcontract'
// import Subpackcontractdetails from '@/components/object/subpack/Subpackcontractdetails'
// import Subpackprogress from '@/components/object/subpack/Subpackprogress'
// import Subpackprogressdetails from '@/components/object/subpack/Subpackprogressdetails'
// import Subpackpayment from '@/components/object/subpack/Subpackpayment'
// import Subpackpaymentdetails from '@/components/object/subpack/Subpackpaymentdetails'
// import Subpackfinishdetails from '@/components/object/subpack/Subpackfinishdetails'
// import Subpackfinish from '@/components/object/subpack/Subpackfinish'
// import Leaseplan from '@/components/object/lease/Leaseplan'
// import Leaseplandetails from '@/components/object/lease/Leaseplandetails'
// import Leasecontract from '@/components/object/lease/Leasecontract'
// import Leasecontractdetails from '@/components/object/lease/Leasecontractdetails'
// import Leasepayment from '@/components/object/lease/Leasepayment'
// import Leasepaymentdetails from '@/components/object/lease/Leasepaymentdetails'
// import Leasesettle from '@/components/object/lease/Leasesettle'
// import Leasesettledetails from '@/components/object/lease/Leasesettledetails'
// import Leaseinto from '@/components/object/lease/Leaseinto'
// import Leaseintodetails from '@/components/object/lease/Leaseintodetails'
// import Leaseout from '@/components/object/lease/Leaseout'
// import Leaseoutdetails from '@/components/object/lease/Leaseoutdetails'
// import Engininvoiceopen from '@/components/object/engininvoice/Engininvoiceopen'
// import Engininvoiceopendetails from '@/components/object/engininvoice/Engininvoiceopendetails'
// import Engininvoicecollec from '@/components/object/engininvoice/Engininvoicecollec'
// import Engininvoicecollecdetails from '@/components/object/engininvoice/Engininvoicecollecdetails'
// import Engindepot from '@/components/object/engininformation/Engindepot'
// import Enginstuff from '@/components/object/engininformation/Enginstuff'
// import Enginstuffdetails from '@/components/object/engininformation/Enginstuffdetails'
// import Engindevice from '@/components/object/engininformation/Engindevice'
// import Engindevicedetails from '@/components/object/engininformation/Engindevicedetails'
// import Conprocessbuildlog from '@/components/object/construction/Conprocessbuildlog'
// import Conprocessbuildlogdetails from '@/components/object/construction/Conprocessbuildlogdetails'
// import Conprocessdesign from '@/components/object/construction/Conprocessdesign'
// import Conprocessdesigndetails from '@/components/object/construction/Conprocessdesigndetails'
// import Conprocesstechnical from '@/components/object/construction/Conprocesstechnical'
// import Conprocesstechnicaldetails from '@/components/object/construction/Conprocesstechnicaldetails'
// import Conprocessscheme from '@/components/object/construction/Conprocessscheme'
// import Conprocessschemedatails from '@/components/object/construction/Conprocessschemedatails'
// import Enginseclog from '@/components/object/construction/Enginseclog'
// import Enginseclogdetails from '@/components/object/construction/Enginseclogdetails'
// import Enginchecklist from '@/components/object/construction/Enginchecklist'
// import Enginchecklistdetails from '@/components/object/construction/Enginchecklistdetails'
// import Enginqualityinspec from '@/components/object/construction/Enginqualityinspec'
// import Enginqualityinspecdetails from '@/components/object/construction/Enginqualityinspecdetails'
// import Enginqualityrevise from '@/components/object/construction/Enginqualityrevise'
// import Enginqualityrevisedetails from '@/components/object/construction/Enginqualityrevisedetails'
// import Deviceplan from '@/components/object/device/Deviceplan'
// import Deviceplandetails from '@/components/object/device/Deviceplandetails'
// import Devicereceive from '@/components/object/device/Devicereceive'
// import Devicereceivedetails from '@/components/object/device/Devicereceivedetails'
// import Deviceinspect from '@/components/object/device/Deviceinspect'
// import Deviceinspectdetails from '@/components/object/device/Deviceinspectdetails'
// import Deviceoil from '@/components/object/device/Deviceoil'
// import Deviceoildetails from '@/components/object/device/Deviceoildetails'
// import Devicerepair from '@/components/object/device/Devicerepair'
// import Devicerepairdetails from '@/components/object/device/Devicerepairdetails'
// import Deviceowncontrat from '@/components/object/device/Deviceowncontrat'
// import Deviceowncontratdetails from '@/components/object/device/Deviceowncontratdetails'
// import Deviceownbuy from '@/components/object/device/Deviceownbuy'
// import Deviceownbuydetails from '@/components/object/device/Deviceownbuydetails'
// import Deviceownallocation from '@/components/object/device/Deviceownallocation'
// import Deviceownallocationdetails from '@/components/object/device/Deviceownallocationdetails'
// import Deviceowndeprecia from '@/components/object/device/Deviceowndeprecia'
// import Deviceowndepreciadetails from '@/components/object/device/Deviceowndepreciadetails'
// import Deviceownscrap from '@/components/object/device/Deviceownscrap'
// import Deviceownscrapdetails from '@/components/object/device/Deviceownscrapdetails'
// import Enginindex from '@/components/object/enginindex/Enginindex'
 **/

const Engin = r => require.ensure([], () => r(require('../components/object/engin/Engin')), 'Engin')
const Engindetails = r => require.ensure([], () => r(require('../components/object/engin/Engindetails')), 'Engindetails')
const Enginspeed = r => require.ensure([], () => r(require('../components/object/enginspeed/Enginspeed')), 'Enginspeed')
const Enginspeeddetails = r => require.ensure([], () => r(require('../components/object/enginspeed/Enginspeeddetails')), 'Enginspeeddetails')
const Enginpayplan = r => require.ensure([], () => r(require('../components/object/enginpayplan/Enginpayplan')), 'Enginpayplan')
const Enginpayplandetails = r => require.ensure([], () => r(require('../components/object/enginpayplan/enginpayplandetails')), 'Enginpayplandetails')
const Incomecontract = r => require.ensure([], () => r(require('../components/object/income/Incomecontract')), 'Incomecontract')
const Incomecontractdetails = r => require.ensure([], () => r(require('../components/object/income/Incomecontractdetails')), 'Incomecontractdetails')
const Incomecollect = r => require.ensure([], () => r(require('../components/object/income/Incomecollect')), 'Incomecollect')
const Incomecollectdetails = r => require.ensure([], () => r(require('../components/object/income/Incomecollectdetails')), 'Incomecollectdetails')
const Incomeprogress = r => require.ensure([], () => r(require('../components/object/income/Incomeprogress')), 'Incomeprogress')
const Incomeprogressdetails = r => require.ensure([], () => r(require('../components/object/income/Incomeprogressdetails')), 'Incomeprogressdetails')
const Incomefinish = r => require.ensure([], () => r(require('../components/object/income/Incomefinish')), 'Incomefinish')
const Incomefinishdetails = r => require.ensure([], () => r(require('../components/object/income/Incomefinishdetails')), 'Incomefinishdetails')
const Incomemodify = r => require.ensure([], () => r(require('../components/object/income/Incomemodify')), 'Incomemodify')
const Incomemodifydetails = r => require.ensure([], () => r(require('../components/object/income/Incomemodifydetails')), 'Incomemodifydetails')
const Stuffplan = r => require.ensure([], () => r(require('../components/object/stuff/Stuffplan')), 'Stuffplan')
const Stuffplandetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffplandetails')), 'Stuffplandetails')
const Stuffneedplan = r => require.ensure([], () => r(require('../components/object/stuff/Stuffneedplan')), 'Stuffneedplan')
const Stuffneedplandetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffneedplandetails')), 'Stuffneedplandetails')
const Stuffcontract = r => require.ensure([], () => r(require('../components/object/stuff/Stuffcontract')), 'Stuffcontract')
const Stuffcontractdetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffcontractdetails')), 'Stuffcontractdetails')
const Stuffintoroom = r => require.ensure([], () => r(require('../components/object/stuff/Stuffintoroom')), 'Stuffintoroom')
const Stuffintoroomdetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffintoroomdetails')), 'Stuffintoroomdetails')
const Stuffsettle = r => require.ensure([], () => r(require('../components/object/stuff/Stuffsettle')), 'Stuffsettle')
const Stuffsettledetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffsettledetails')), 'Stuffsettledetails')
const Stuffoutroom = r => require.ensure([], () => r(require('../components/object/stuff/Stuffoutroom')), 'Stuffoutroom')
const Stuffoutroomdetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffoutroomdetails')), 'Stuffoutroomdetails')
const Stuffpayment = r => require.ensure([], () => r(require('../components/object/stuff/Stuffpayment')), 'Stuffpayment')
const Stuffpaymentdetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffpaymentdetails')), 'Stuffpaymentdetails')
const Stufftuiroom = r => require.ensure([], () => r(require('../components/object/stuff/Stufftuiroom')), 'Stufftuiroom')
const Stuffinventory = r => require.ensure([], () => r(require('../components/object/stuff/Stuffinventory')), 'Stuffinventory')
const Stuffinventorydetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffinventorydetails')), 'Stuffinventorydetails')
const Stufftuiroomdetails = r => require.ensure([], () => r(require('../components/object/stuff/Stufftuiroomdetails')), 'Stufftuiroomdetails')
const Stuffallocation = r => require.ensure([], () => r(require('../components/object/stuff/Stuffallocation')), 'Stuffallocation')
const Stuffallocationdetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffallocationdetails')), 'Stuffallocationdetails')
const Stuffearly = r => require.ensure([], () => r(require('../components/object/stuff/Stuffearly')), 'Stuffearly')
const Stuffearlydetails = r => require.ensure([], () => r(require('../components/object/stuff/Stuffearlydetails')), 'Stuffearlydetails')
const Labourcontract = r => require.ensure([], () => r(require('../components/object/labour/Labourcontract')), 'Labourcontract')
const Labourcontractdetails = r => require.ensure([], () => r(require('../components/object/labour/Labourcontractdetails')), 'Labourcontractdetails')
const Labourprogress = r => require.ensure([], () => r(require('../components/object/labour/Labourprogress')), 'Labourprogress')
const Labourprogressdetails = r => require.ensure([], () => r(require('../components/object/labour/Labourprogressdetails')), 'Labourprogressdetails')
const Labourpayment = r => require.ensure([], () => r(require('../components/object/labour/Labourpayment')), 'Labourpayment')
const Labourpaymentdetails = r => require.ensure([], () => r(require('../components/object/labour/Labourpaymentdetails')), 'Labourpaymentdetails')
const Labourfinish = r => require.ensure([], () => r(require('../components/object/labour/Labourfinish')), 'Labourfinish')
const Labourfinishdetails = r => require.ensure([], () => r(require('../components/object/labour/Labourfinishdetails')), 'Labourfinishdetails')
const Laboursporadic = r => require.ensure([], () => r(require('../components/object/labour/Laboursporadic')), 'Laboursporadic')
const Laboursporadicdetails = r => require.ensure([], () => r(require('../components/object/labour/Laboursporadicdetails')), 'Laboursporadicdetails')
const Subpackcontract = r => require.ensure([], () => r(require('../components/object/subpack/Subpackcontract')), 'Subpackcontract')
const Subpackcontractdetails = r => require.ensure([], () => r(require('../components/object/subpack/Subpackcontractdetails')), 'Subpackcontractdetails')
const Subpackprogress = r => require.ensure([], () => r(require('../components/object/subpack/Subpackprogress')), 'Subpackprogress')
const Subpackprogressdetails = r => require.ensure([], () => r(require('../components/object/subpack/Subpackprogressdetails')), 'Subpackprogressdetails')
const Subpackpayment = r => require.ensure([], () => r(require('../components/object/subpack/Subpackpayment')), 'Subpackpayment')
const Subpackpaymentdetails = r => require.ensure([], () => r(require('../components/object/subpack/Subpackpaymentdetails')), 'Subpackpaymentdetails')
const Subpackfinishdetails = r => require.ensure([], () => r(require('../components/object/subpack/Subpackfinishdetails')), 'Subpackfinishdetails')
const Subpackfinish = r => require.ensure([], () => r(require('../components/object/subpack/Subpackfinish')), 'Subpackfinish')
const Leaseplan = r => require.ensure([], () => r(require('../components/object/lease/Leaseplan')), 'Leaseplan')
const Leaseplandetails = r => require.ensure([], () => r(require('../components/object/lease/Leaseplandetails')), 'Leaseplandetails')
const Leasecontract = r => require.ensure([], () => r(require('../components/object/lease/Leasecontract')), 'Leasecontract')
const Leasecontractdetails = r => require.ensure([], () => r(require('../components/object/lease/Leasecontractdetails')), 'Leasecontractdetails')
const Leasepayment = r => require.ensure([], () => r(require('../components/object/lease/Leasepayment')), 'Leasepayment')
const Leasepaymentdetails = r => require.ensure([], () => r(require('../components/object/lease/Leasepaymentdetails')), 'Leasepaymentdetails')
const Leasesettle = r => require.ensure([], () => r(require('../components/object/lease/Leasesettle')), 'Leasesettle')
const Leasesettledetails = r => require.ensure([], () => r(require('../components/object/lease/Leasesettledetails')), 'Leasesettledetails')
const Leaseinto = r => require.ensure([], () => r(require('../components/object/lease/Leaseinto')), 'Leaseinto')
const Leaseintodetails = r => require.ensure([], () => r(require('../components/object/lease/Leaseintodetails')), 'Leaseintodetails')
const Leaseout = r => require.ensure([], () => r(require('../components/object/lease/Leaseout')), 'Leaseout')
const Leaseoutdetails = r => require.ensure([], () => r(require('../components/object/lease/Leaseoutdetails')), 'Leaseoutdetails')
const Engininvoiceopen = r => require.ensure([], () => r(require('../components/object/engininvoice/Engininvoiceopen')), 'Engininvoiceopen')
const Engininvoiceopendetails = r => require.ensure([], () => r(require('../components/object/engininvoice/Engininvoiceopendetails')), 'Engininvoiceopendetails')
const Engininvoicecollec = r => require.ensure([], () => r(require('../components/object/engininvoice/Engininvoicecollec')), 'Engininvoicecollec')
const Engininvoicecollecdetails = r => require.ensure([], () => r(require('../components/object/engininvoice/Engininvoicecollecdetails')), 'Engininvoicecollecdetails')
const Engindepot = r => require.ensure([], () => r(require('../components/object/engininformation/Engindepot')), 'Engindepot')
const Enginstuff = r => require.ensure([], () => r(require('../components/object/engininformation/Enginstuff')), 'Enginstuff')
const Enginstuffdetails = r => require.ensure([], () => r(require('../components/object/engininformation/Enginstuffdetails')), 'Enginstuffdetails')
const Engindevice = r => require.ensure([], () => r(require('../components/object/engininformation/Engindevice')), 'Engindevice')
const Engindevicedetails = r => require.ensure([], () => r(require('../components/object/engininformation/Engindevicedetails')), 'Engindevicedetails')
const Conprocessbuildlog = r => require.ensure([], () => r(require('../components/object/construction/Conprocessbuildlog')), 'Conprocessbuildlog')
const Conprocessbuildlogdetails = r => require.ensure([], () => r(require('../components/object/construction/Conprocessbuildlogdetails')), 'Conprocessbuildlogdetails')
const Conprocessdesign = r => require.ensure([], () => r(require('../components/object/construction/Conprocessdesign')), 'Conprocessdesign')
const Conprocessdesigndetails = r => require.ensure([], () => r(require('../components/object/construction/Conprocessdesigndetails')), 'Conprocessdesigndetails')
const Conprocesstechnical = r => require.ensure([], () => r(require('../components/object/construction/Conprocesstechnical')), 'Conprocesstechnical')
const Conprocesstechnicaldetails = r => require.ensure([], () => r(require('../components/object/construction/Conprocesstechnicaldetails')), 'Conprocesstechnicaldetails')
const Conprocessscheme = r => require.ensure([], () => r(require('../components/object/construction/Conprocessscheme')), 'Conprocessscheme')
const Conprocessschemedatails = r => require.ensure([], () => r(require('../components/object/construction/Conprocessschemedatails')), 'Conprocessschemedatails')
const Enginseclog = r => require.ensure([], () => r(require('../components/object/construction/Enginseclog')), 'Enginseclog')
const Enginseclogdetails = r => require.ensure([], () => r(require('../components/object/construction/Enginseclogdetails')), 'Enginseclogdetails')
const Enginchecklist = r => require.ensure([], () => r(require('../components/object/construction/Enginchecklist')), 'Enginchecklist')
const Enginchecklistdetails = r => require.ensure([], () => r(require('../components/object/construction/Enginchecklistdetails')), 'Enginchecklistdetails')
const Enginqualityinspec = r => require.ensure([], () => r(require('../components/object/construction/Enginqualityinspec')), 'Enginqualityinspec')
const Enginqualityinspecdetails = r => require.ensure([], () => r(require('../components/object/construction/Enginqualityinspecdetails')), 'Enginqualityinspecdetails')
const Enginqualityrevise = r => require.ensure([], () => r(require('../components/object/construction/Enginqualityrevise')), 'Enginqualityrevise')
const Enginqualityrevisedetails = r => require.ensure([], () => r(require('../components/object/construction/Enginqualityrevisedetails')), 'Enginqualityrevisedetails')
const Deviceplan = r => require.ensure([], () => r(require('../components/object/device/Deviceplan')), 'Deviceplan')
const Deviceplandetails = r => require.ensure([], () => r(require('../components/object/device/Deviceplandetails')), 'Deviceplandetails')
const Devicereceive = r => require.ensure([], () => r(require('../components/object/device/Devicereceive')), 'Devicereceive')
const Devicereceivedetails = r => require.ensure([], () => r(require('../components/object/device/Devicereceivedetails')), 'Devicereceivedetails')
const Deviceinspect = r => require.ensure([], () => r(require('../components/object/device/Deviceinspect')), 'Deviceinspect')
const Deviceinspectdetails = r => require.ensure([], () => r(require('../components/object/device/Deviceinspectdetails')), 'Deviceinspectdetails')
const Deviceoil = r => require.ensure([], () => r(require('../components/object/device/Deviceoil')), 'Deviceoil')
const Deviceoildetails = r => require.ensure([], () => r(require('../components/object/device/Deviceoildetails')), 'Deviceoildetails')
const Devicerepair = r => require.ensure([], () => r(require('../components/object/device/Devicerepair')), 'Devicerepair')
const Devicerepairdetails = r => require.ensure([], () => r(require('../components/object/device/Devicerepairdetails')), 'Devicerepairdetails')
const Deviceowncontrat = r => require.ensure([], () => r(require('../components/object/device/Deviceowncontrat')), 'Deviceowncontrat')
const Deviceowncontratdetails = r => require.ensure([], () => r(require('../components/object/device/Deviceowncontratdetails')), 'Deviceowncontratdetails')
const Deviceownbuy = r => require.ensure([], () => r(require('../components/object/device/Deviceownbuy')), 'Deviceownbuy')
const Deviceownbuydetails = r => require.ensure([], () => r(require('../components/object/device/Deviceownbuydetails')), 'Deviceownbuydetails')
const Deviceownallocation = r => require.ensure([], () => r(require('../components/object/device/Deviceownallocation')), 'Deviceownallocation')
const Deviceownallocationdetails = r => require.ensure([], () => r(require('../components/object/device/Deviceownallocationdetails')), 'Deviceownallocationdetails')
const Deviceowndeprecia = r => require.ensure([], () => r(require('../components/object/device/Deviceowndeprecia')), 'Deviceowndeprecia')
const Deviceowndepreciadetails = r => require.ensure([], () => r(require('../components/object/device/Deviceowndepreciadetails')), 'Deviceowndepreciadetails')
const Deviceownscrap = r => require.ensure([], () => r(require('../components/object/device/Deviceownscrap')), 'Deviceownscrap')
const Deviceownscrapdetails = r => require.ensure([], () => r(require('../components/object/device/Deviceownscrapdetails')), 'Deviceownscrapdetails')
const Enginindex = r => require.ensure([], () => r(require('../components/object/enginindex/Enginindex')), 'Enginindex')

Vue.use(Router)
export default [
  // 项目立项
  {
    path: '/engin',
    name: 'Engin',
    component: Engin,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 项目立项详情
  {
    path: '/engindetails',
    name: 'Engindetails',
    component: Engindetails
  },
  // 进度填报
  {
    path: '/enginspeed',
    name: 'Enginspeed',
    component: Enginspeed,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 进度填报详情
  {
    path: '/enginspeeddetails',
    name: 'Enginspeeddetails',
    component: Enginspeeddetails
  },
  // 支出计划
  {
    path: '/enginpayplan',
    name: 'Enginpayplan',
    component: Enginpayplan,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 支出计划详情
  {
    path: '/enginpayplandetails',
    name: 'Enginpayplandetails',
    component: Enginpayplandetails
  },
  // 收入合同
  {
    path: '/incomecontract',
    name: 'Incomecontract',
    component: Incomecontract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 收入详情
  {
    path: '/incomecontractdetails',
    name: 'Incomecontractdetails',
    component: Incomecontractdetails
  },
  // 合同收款
  {
    path: '/incomecollect',
    name: 'Incomecollect',
    component: Incomecollect,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 合同收款详情
  {
    path: '/incomecollectdetails',
    name: 'Incomecollectdetails',
    component: Incomecollectdetails
  },
  // 精度款申报
  {
    path: '/incomeprogress',
    name: 'Incomeprogress',
    component: Incomeprogress,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 精度款申报详情
  {
    path: '/incomeprogressdetails',
    name: 'Incomeprogressdetails',
    component: Incomeprogressdetails
  },
  // 完工结算
  {
    path: '/incomefinish',
    name: 'Incomefinish',
    component: Incomefinish,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 完工结算详情
  {
    path: '/incomefinishdetails',
    name: 'Incomefinishdetails',
    component: Incomefinishdetails
  },
  // 合同变更
  {
    path: '/incomemodify',
    name: 'Incomemodify',
    component: Incomemodify,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 合同变更详情
  {
    path: '/incomemodifydetails',
    name: 'Incomemodifydetails',
    component: Incomemodifydetails
  },
  // 材料总计划
  {
    path: '/stuffplan',
    name: 'Stuffplan',
    component: Stuffplan,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料总计划详情
  {
    path: '/stuffplandetails',
    name: 'Stuffplandetails',
    component: Stuffplandetails
  },
  // 材料需用计划
  {
    path: '/stuffneedplan',
    name: 'Stuffneedplan',
    component: Stuffneedplan,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料需用计划详情
  {
    path: '/stuffneedplandetails',
    name: 'Stuffneedplandetails',
    component: Stuffneedplandetails
  },
  // 材料合同
  {
    path: '/stuffcontract',
    name: 'Stuffcontract',
    component: Stuffcontract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料合同详情
  {
    path: '/stuffcontractdetails',
    name: 'Stuffcontractdetails',
    component: Stuffcontractdetails
  },
  // 材料入库
  {
    path: '/stuffintoroom',
    name: 'Stuffintoroom',
    component: Stuffintoroom,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料入库详情
  {
    path: '/stuffintoroomdetails',
    name: 'Stuffintoroomdetails',
    component: Stuffintoroomdetails
  },
  // 材料结算
  {
    path: '/stuffsettle',
    name: 'Stuffsettle',
    component: Stuffsettle,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料结算详情
  {
    path: '/stuffsettledetails',
    name: 'Stuffsettledetails',
    component: Stuffsettledetails
  },
  // 材料出库
  {
    path: '/stuffoutroom',
    name: 'Stuffoutroom',
    component: Stuffoutroom,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料出库详情
  {
    path: '/stuffoutroomdetails',
    name: 'Stuffoutroomdetails',
    component: Stuffoutroomdetails
  },
  // 材料付款
  {
    path: '/stuffpayment',
    name: 'Stuffpayment',
    component: Stuffpayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料出库详情
  {
    path: '/stuffpaymentdetails',
    name: 'Stuffpaymentdetails',
    component: Stuffpaymentdetails
  },
  // 材料退库
  {
    path: '/stufftuiroom',
    name: 'Stufftuiroom',
    component: Stufftuiroom,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料退库详情
  {
    path: '/stufftuiroomdetails',
    name: 'Stufftuiroomdetails',
    component: Stufftuiroomdetails
  },
  // 材料调拨
  {
    path: '/stuffallocation',
    name: 'Stuffallocation',
    component: Stuffallocation,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料调拨详情
  {
    path: '/stuffallocationdetails',
    name: 'Stuffallocationdetails',
    component: Stuffallocationdetails
  },
  // 库存期初
  {
    path: '/stuffearly',
    name: 'Stuffearly',
    component: Stuffearly,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料调拨详情
  {
    path: '/stuffearlydetails',
    name: 'Stuffearlydetails',
    component: Stuffearlydetails
  },
  // 劳务合同
  {
    path: '/labourcontract',
    name: 'Labourcontract',
    component: Labourcontract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 劳务合同详情
  {
    path: '/labourcontractdetails',
    name: 'Labourcontractdetails',
    component: Labourcontractdetails
  },
  // 进度款申报
  {
    path: '/labourprogress',
    name: 'Labourprogress',
    component: Labourprogress,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 进度款申报详情
  {
    path: '/labourprogressdetails',
    name: 'Labourprogressdetails',
    component: Labourprogressdetails
  },
  // 劳务付款
  {
    path: '/labourpayment',
    name: 'Labourpayment',
    component: Labourpayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 劳务付款详情
  {
    path: '/labourpaymentdetails',
    name: 'Labourpaymentdetails',
    component: Labourpaymentdetails
  },
  // 完工结算
  {
    path: '/labourfinish',
    name: 'Labourfinish',
    component: Labourfinish,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 完工结算详情
  {
    path: '/labourfinishdetails',
    name: 'Labourfinishdetails',
    component: Labourfinishdetails
  },
  // 零星劳务单
  {
    path: '/laboursporadic',
    name: 'Laboursporadic',
    component: Laboursporadic,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 零星劳务单详情
  {
    path: '/laboursporadicdetails',
    name: 'Laboursporadicdetails',
    component: Laboursporadicdetails
  },
  // 分包合同
  {
    path: '/subpackcontract',
    name: 'Subpackcontract',
    component: Subpackcontract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 分包合同详情
  {
    path: '/subpackcontractdetails',
    name: 'Subpackcontractdetails',
    component: Subpackcontractdetails
  },
  // 进度款申报
  {
    path: '/subpackprogress',
    name: 'Subpackprogress',
    component: Subpackprogress,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 进度款申报详情
  {
    path: '/subpackprogressdetails',
    name: 'Subpackprogressdetails',
    component: Subpackprogressdetails
  },
  // 分包付款
  {
    path: '/subpackpayment',
    name: 'Subpackpayment',
    component: Subpackpayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 分包付款详情
  {
    path: '/subpackpaymentdetails',
    name: 'Subpackpaymentdetails',
    component: Subpackpaymentdetails
  },
  // 完工结算
  {
    path: '/subpackfinish',
    name: 'Subpackfinish',
    component: Subpackfinish,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 完工结算详情
  {
    path: '/subpackfinishdetails',
    name: 'Subpackfinishdetails',
    component: Subpackfinishdetails
  },
  // 租赁计划
  {
    path: '/leaseplan',
    name: 'Leaseplan',
    component: Leaseplan,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 租赁计划详情
  {
    path: '/leaseplandetails',
    name: 'Leaseplandetails',
    component: Leaseplandetails
  },
  // 租赁合同
  {
    path: '/leasecontract',
    name: 'Leasecontract',
    component: Leasecontract,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 租赁合同详情
  {
    path: '/leasecontractdetails',
    name: 'Leasecontractdetails',
    component: Leasecontractdetails
  },
  // 租赁付款
  {
    path: '/leasepayment',
    name: 'Leasepayment',
    component: Leasepayment,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 租赁付款详情
  {
    path: '/leasepaymentdetails',
    name: 'Leasepaymentdetails',
    component: Leasepaymentdetails
  },
  // 租赁结算
  {
    path: '/leasesettle',
    name: 'Leasesettle',
    component: Leasesettle,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 租赁付款详情
  {
    path: '/leasesettledetails',
    name: 'Leasesettledetails',
    component: Leasesettledetails
  },
  // 租赁进场
  {
    path: '/Leaseinto',
    name: 'Leaseinto',
    component: Leaseinto,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 租赁进场详情
  {
    path: '/leaseintodetails',
    name: 'Leaseintodetails',
    component: Leaseintodetails
  },
  // 租赁退场
  {
    path: '/leaseout',
    name: 'Leaseout',
    component: Leaseout,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 租赁退场详情
  {
    path: '/leaseoutdetails',
    name: 'Leaseoutdetails',
    component: Leaseoutdetails
  },
  // 开票登记
  {
    path: '/engininvoiceopen',
    name: 'Engininvoiceopen',
    component: Engininvoiceopen,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 开票登记详情
  {
    path: '/engininvoiceopendetails',
    name: 'Engininvoiceopendetails',
    component: Engininvoiceopendetails
  },
  // 收票登记
  {
    path: '/engininvoicecollec',
    name: 'Engininvoicecollec',
    component: Engininvoicecollec,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 开票登记详情
  {
    path: '/engininvoicecollecdetails',
    name: 'Engininvoicecollecdetails',
    component: Engininvoicecollecdetails
  },
  // 仓库信息
  {
    path: '/engindepot',
    name: 'Engindepot',
    component: Engindepot
  },
  //  材料信息
  {
    path: '/enginstuff',
    name: 'Enginstuff',
    component: Enginstuff,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料信息详情
  {
    path: '/enginstuffdetails',
    name: 'Enginstuffdetails',
    component: Enginstuffdetails
  },
  //  设备信息
  {
    path: '/engindevice',
    name: 'Engindevice',
    component: Engindevice,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 设备信息详情
  {
    path: '/engindevicedetails',
    name: 'Engindevicedetails',
    component: Engindevicedetails
  },
  //  施工日志
  {
    path: '/conprocessbuildlog',
    name: 'Conprocessbuildlog',
    component: Conprocessbuildlog,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 施工日志详情
  {
    path: '/conprocessbuildlogdetails',
    name: 'Conprocessbuildlogdetails',
    component: Conprocessbuildlogdetails
  },
  //  设计变更
  {
    path: '/conprocessdesign',
    name: 'Conprocessdesign',
    component: Conprocessdesign,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 设计变更详情
  {
    path: '/conprocessdesigndetails',
    name: 'Conprocessdesigndetails',
    component: Conprocessdesigndetails
  },
  //  技术交底
  {
    path: '/conprocesstechnical',
    name: 'Conprocesstechnical',
    component: Conprocesstechnical,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 技术交底详情
  {
    path: '/conprocesstechnicaldetails',
    name: 'Conprocesstechnicaldetails',
    component: Conprocesstechnicaldetails
  },
  //  施工组织方案
  {
    path: '/conprocessscheme',
    name: 'Conprocessscheme',
    component: Conprocessscheme,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 施工组织方案详情
  {
    path: '/conprocessschemedatails',
    name: 'Conprocessschemedatails',
    component: Conprocessschemedatails
  },
  //  安全日志
  {
    path: '/enginseclog',
    name: 'Enginseclog',
    component: Enginseclog,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 安全日志详情
  {
    path: '/enginseclogdetails',
    name: 'Enginseclogdetails',
    component: Enginseclogdetails
  },
  //  安全检查
  {
    path: '/enginchecklist',
    name: 'Enginchecklist',
    component: Enginchecklist,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 安全检查详情
  {
    path: '/enginchecklistdetails',
    name: 'Enginchecklistdetails',
    component: Enginchecklistdetails
  },
  // 质量巡查
  {
    path: '/enginqualityinspec',
    name: 'Enginqualityinspec',
    component: Enginqualityinspec,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 质量巡查详情
  {
    path: '/enginqualityinspecdetails',
    name: 'Enginqualityinspecdetails',
    component: Enginqualityinspecdetails
  },
  //  质量整改
  {
    path: '/enginqualityrevise',
    name: 'Enginqualityrevise',
    component: Enginqualityrevise,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 质量整改详情
  {
    path: '/enginqualityrevisedetails',
    name: 'Enginqualityrevisedetails',
    component: Enginqualityrevisedetails
  },
  //  设备需求计划
  {
    path: '/deviceplan',
    name: 'Deviceplan',
    component: Deviceplan,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 设备需求计划详情
  {
    path: '/deviceplandetails',
    name: 'Deviceplandetails',
    component: Deviceplandetails
  },
  //  设备领用
  {
    path: '/devicereceive',
    name: 'Devicereceive',
    component: Devicereceive,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 设备领用详情
  {
    path: '/devicereceivedetails',
    name: 'Devicereceivedetails',
    component: Devicereceivedetails
  },
  //  设备检查
  {
    path: '/deviceinspect',
    name: 'Deviceinspect',
    component: Deviceinspect,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 设备检查详情
  {
    path: '/deviceinspectdetails',
    name: 'Deviceinspectdetails',
    component: Deviceinspectdetails
  },
  //  设备油耗
  {
    path: '/deviceoil',
    name: 'Deviceoil',
    component: Deviceoil,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 设备油耗详情
  {
    path: '/deviceoildetails',
    name: 'Deviceoildetails',
    component: Deviceoildetails
  },
  //  设备维修/维保
  {
    path: '/devicerepair',
    name: 'Devicerepair',
    component: Devicerepair,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 设备维修/维保详情
  {
    path: '/devicerepairdetails',
    name: 'Devicerepairdetails',
    component: Devicerepairdetails
  },
  //  自有设备采购合同
  {
    path: '/deviceowncontrat',
    name: 'Deviceowncontrat',
    component: Deviceowncontrat,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 自有设备采购合同详情
  {
    path: '/deviceowncontratdetails',
    name: 'Deviceowncontratdetails',
    component: Deviceowncontratdetails
  },
  //  自有设备采购
  {
    path: '/deviceownbuy',
    name: 'Deviceownbuy',
    component: Deviceownbuy,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 自有设备采购详情
  {
    path: '/deviceownbuydetails',
    name: 'Deviceownbuydetails',
    component: Deviceownbuydetails
  },
  //  自有设备调拨
  {
    path: '/deviceownallocation',
    name: 'Deviceownallocation',
    component: Deviceownallocation,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 自有设备调拨详情
  {
    path: '/deviceownallocationdetails',
    name: 'Deviceownallocationdetails',
    component: Deviceownallocationdetails
  },
  //  自有设备折旧
  {
    path: '/deviceowndeprecia',
    name: 'Deviceowndeprecia',
    component: Deviceowndeprecia,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 自有设备折旧详情
  {
    path: '/deviceowndepreciadetails',
    name: 'Deviceowndepreciadetails',
    component: Deviceowndepreciadetails
  },
  //  自有设备折旧
  {
    path: '/deviceownscrap',
    name: 'Deviceownscrap',
    component: Deviceownscrap,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 自有设备折旧详情
  {
    path: '/deviceownscrapdetails',
    name: 'Deviceownscrapdetails',
    component: Deviceownscrapdetails
  },
  // 项目首页
  {
    path: '/enginindex',
    name: 'Enginindex',
    component: Enginindex
  },
  //  材料盤點
  {
    path: '/stuffinventory',
    name: 'Stuffinventory',
    component: Stuffinventory,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  // 材料盤點详情
  {
    path: '/stuffinventorydetails',
    name: 'Stuffinventorydetails',
    component: Stuffinventorydetails
  }
]
