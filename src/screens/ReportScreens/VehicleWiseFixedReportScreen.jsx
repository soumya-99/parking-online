// import { PixelRatio, Pressable, StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, Alert, NativeModules, ToastAndroid, PermissionsAndroid } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios'
// import BleManager from 'react-native-ble-manager';

// import CustomButtonComponent from '../../component/CustomButtonComponent';
// import CustomHeader from '../../component/CustomHeader';
// import allColor from '../../Resources/Colors/Color';
// import icons from '../../Resources/Icons/icons';
// import getAuthUser from '../../Hooks/getAuthUser';
// const width = Dimensions.get("screen").width
// // import ThermalPrinterModule from 'react-native-thermal-printer';
// import VehicleReports from '../../Hooks/Sql/ReportsStore/VehicleReports';
// import getReceiptSettings from '../../Hooks/Controller/ReceiptSetting/getReceiptSettings';
// import DeviceInfo from 'react-native-device-info';
// import ReceiptImageStorage from '../../Hooks/Sql/Receipt Setting Storage/ReceiptImageStorage';
// import VehicleInOutStore from '../../Hooks/Sql/VehicleInOut/VehicleInOutStore';
// import storeUsers from '../../Hooks/Sql/User/storeuser';

// const VehicleWiseFixedReportScreen = ({ navigation }) => {
//     // NativeModules.MyPrinter is a reference to a native module named MyPrinter.   
//     const MyModules = NativeModules.MyPrinter;
//     const { retrieveAuthUser } = getAuthUser()
//     const { getUserByToken } = storeUsers()
//     const [isBlueToothEnable, setIsBlueToothEnable] = useState(false)

//     // State for manage the  total price
//     const [totalPrice, setTotalPrice] = useState(0)
//     // State for manage the  total quantity
//     const [totalQTY, setTotalQTY] = useState(0)
//     // State for manage the  total Advance Price
//     const [totalAdvance, setTotalAdvance] = useState(0)

//     // State for manage the unBilled Data
//     const [unbilledData, setUnbilledData] = useState()
//     // State for manage the  loading values 
//     const [loading, setLoading] = useState()

//     // create a new Date object
//     const date = new Date()

//     // State for manage the From date 
//     const [mydateFrom, setDateFrom] = useState(new Date());
//     const [displaymodeFrom, setModeFrom] = useState('date');
//     const [isDisplayDateFrom, setShowFrom] = useState(false);

//     // handle change From date
//     const changeSelectedDateFrom = (event, selectedDate) => {
//         const currentDate = selectedDate || mydateFrom;
//         setDateFrom(currentDate);
//         setShowFrom(false)
//         setShowFrom(false)

//     };

//     const [mydateTo, setDateTo] = useState(new Date());
//     const [displaymodeTo, setModeTo] = useState('date');
//     const [isDisplayDateTo, setShowTo] = useState(false);
//     // handle change to date
//     const changeSelectedDateTo = (event, selectedDate) => {
//         const currentDate = selectedDate || mydateTo;
//         setDateTo(currentDate);
//         setShowTo(false)
//         // console.log(selectedDate)
//         // getUnbilledReport(selectedDate)
//     };

//     const [showGenerate, setShowGenerate] = useState(false)
//     const [value, setValue] = useState(0)

//     useEffect(() => {
//         // all the functions are call when mydateTo, mydateFrom values are changed
//         setValue(value + 1)
//         if (value != 0) {
//             setShowGenerate(true)
//         }
//         handleGenerateReport()
//     }, [mydateTo, mydateFrom])

//     return (
//         <View style={{ flex: 1 }}>
//             {/* render custom Header */}
//             <CustomHeader title={"Vehicle Wise Fixed Reports"} navigation={navigation} />
//             {/* render from date picker */}
//             {isDisplayDateFrom && <DateTimePicker
//                 testID="dateTimePicker"
//                 value={mydateFrom}
//                 mode={displaymodeFrom}
//                 is24Hour={true}
//                 display="default"
//                 onChange={changeSelectedDateFrom}
//             />
//             }

//             {/* render to date picker */}
//             {isDisplayDateTo && <DateTimePicker
//                 testID="dateTimePicker"
//                 value={mydateTo}
//                 mode={displaymodeTo}
//                 is24Hour={true}
//                 display="default"
//                 onChange={changeSelectedDateTo}
//             />
//             }

//             <View style={{ padding: PixelRatio.roundToNearestPixel(20), flex: 1 }}>
//                 <Text style={styles.select_date_header}>
//                     Select Date

//                     { }
//                 </Text>
//                 {/* date selector button */}
//                 <View style={styles.select_date_button_container}>
//                     <Text style={{ ...styles.date_text, marginRight: 50 }}>
//                         From Date
//                     </Text>
//                     <Text style={{ ...styles.date_text, marginLeft: 20 }}>
//                         To Date
//                     </Text>

//                 </View>
//                 <View style={styles.select_date_button_container}>

//                     <Pressable style={styles.select_date_button} onPress={() => setShowFrom(true)}>

//                         {icons.calendar}
//                         <Text style={styles.date_text}>
//                             {mydateFrom.toLocaleDateString('en-GB')}
//                         </Text>
//                     </Pressable>

//                     <Pressable style={styles.select_date_button} onPress={() => setShowTo(true)}>
//                         {icons.calendar}
//                         <Text style={styles.date_text}>
//                             {mydateTo.toLocaleDateString('en-GB')}
//                         </Text>
//                     </Pressable>

//                 </View>

//                 {loading && <Text> fetchig data... </Text>}

//                 {/* report genarate table */}
//                 {unbilledData && <View>
//                     <ScrollView>
//                         <View style={styles.container}>
//                             <View style={[styles.row, styles.header]}>
//                                 <Text style={[styles.headerText, styles.hcell]}>Vh type</Text>
//                                 <Text style={[styles.headerText, styles.hcell]}>Qty</Text>
//                                 <Text style={[styles.headerText, styles.hcell]}>Advance</Text>

//                                 <Text style={[styles.headerText, styles.hcell]}>Amount</Text>

//                             </View>
//                             {unbilledData && unbilledData.map((item, index) => (
//                                 <View style={[styles.row, index % 2 != 0 ? styles.evenBg : styles.oddbg]} key={index}>
//                                     {console.log(item.vehicle_id)}
//                                     <Text style={[styles.cell]}>{item.vehicleType} </Text>
//                                     <Text style={[styles.cell]}>{item.quantity}</Text>
//                                     <Text style={[styles.cell]}>{item.TotalAdvance}</Text>

//                                     <Text style={[styles.cell]}>{item.totalAmount}</Text>
//                                     {/* <Text style={[styles.cell]}>{item.age}</Text> */}
//                                 </View>
//                             ))}
//                             <View style={{ ...styles.row, backgroundColor: allColor['primary-color'] }}>

//                                 <Text style={[styles.cell, styles.hcell]}>{"Total"} </Text>
//                                 <Text style={[styles.cell, styles.hcell]}>{unbilledData && totalQTY}</Text>
//                                 <Text style={[styles.cell, styles.hcell]}>{unbilledData && totalAdvance}</Text>
//                                 <Text style={[styles.cell, styles.hcell]}>{unbilledData && totalPrice}</Text>
//                                 {/* <Text style={[styles.cell]}>{item.age}</Text> */}
//                             </View>
//                             <View style={{

//                             }}>
//                                 <Text style={{ marginLeft: 10 }}>Report Generated on {date.toLocaleString()} </Text>
//                             </View>
//                         </View>

//                     </ScrollView>
//                 </View>}
//                 {/* back and print action button */}
//                 <View style={styles.actionButton}>
//                     {/* Generate Button */}
//                     {showGenerate && <CustomButtonComponent.GoButton title={"Generate Report"} style={{ flex: 1, marginLeft: 10 }} onAction={() => handleGenerateReport()} />}
//                     {/* Back Button */}

//                     {<CustomButtonComponent.CancelButton title={"Back"} style={{ flex: 1, marginRight: 10 }} onAction={() => navigation.goBack()} />}
//                     {/* Print Button */}
//                     {unbilledData && <CustomButtonComponent.GoButton title={"Print Report"} style={{ flex: 1, marginLeft: 10 }} onAction={() => handleUnbilledPrint()} />}
//                 </View>
//             </View>
//         </View>
//     )
// }

// export default VehicleWiseFixedReportScreen

// const styles = StyleSheet.create({
//     select_date_header: {
//         alignSelf: "center",
//         fontSize: PixelRatio.roundToNearestPixel(16),
//         paddingBottom: PixelRatio.roundToNearestPixel(10),
//         fontWeight: "500",
//         color: allColor.black
//     },
//     select_date_button: {
//         flex: 1,
//         borderWidth: 2,
//         borderColor: allColor['light-gray'],
//         padding: PixelRatio.roundToNearestPixel(10),
//         margin: PixelRatio.roundToNearestPixel(5),
//         borderRadius: PixelRatio.roundToNearestPixel(20),
//         flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
//         backgroundColor: allColor.white,
//         elevation: PixelRatio.roundToNearestPixel(20)
//     },
//     date_text: {
//         marginLeft: PixelRatio.roundToNearestPixel(10),
//         fontWeight: '600',
//         color: allColor.black
//     },
//     select_date_button_container: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     actionButton: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: "space-between",
//         position: 'absolute',
//         bottom: 0,
//         marginBottom: PixelRatio.roundToNearestPixel(5),
//         width: width,
//         padding: PixelRatio.roundToNearestPixel(10)
//     },
//     container: {
//         flex: 1,
//         borderRadius: PixelRatio.roundToNearestPixel(10),
//         backgroundColor: allColor.white,
//         marginBottom: 200
//     },
//     header: {
//         backgroundColor: allColor['primary-color'],
//         borderTopRightRadius: PixelRatio.roundToNearestPixel(10),
//         borderTopLeftRadius: PixelRatio.roundToNearestPixel(10),


//     },
//     headerText: {
//         fontWeight: 'bold',
//         color: allColor.white
//     },
//     row: {

//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         paddingVertical: 5,
//         paddingHorizontal: PixelRatio.roundToNearestPixel(10),

//     },
//     cell: {
//         flex: 1,
//         color: allColor.black
//     },
//     hcell: {
//         flex: 1,
//         color: allColor.white
//     },
//     oddbg: {

//     },

//     evenBg: {
//         backgroundColor: "#dddddd"
//     }

// })