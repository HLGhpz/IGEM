const app = getApp()

function inArray(arr, key, val) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) {
            return i;
        }
    }
    return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
    var hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
            return ('00' + bit.toString(16)).slice(-2)
        }
    )
    return hexArr.join('');
}

Page({
    data: {
        devices: [],
        connected: false,
        chs: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        /* 初始化蓝牙适配器 */
        this.openBluetoothAdapter();

    },

    openBluetoothAdapter() {
        //初始化蓝牙模块
        wx.openBluetoothAdapter({
            success: (res) => {
                console.log('openBluetoothAdapter success', res)
                this.startBluetoothDevicesDiscovery()
            },
            fail: (res) => {
                if (res.errCode === 10001) {
                    wx.onBluetoothAdapterStateChange(function (res) {
                        //监听蓝牙适配器状态变化事件
                        console.log('onBluetoothAdapterStateChange', res)
                        if (res.available) {
                            this.startBluetoothDevicesDiscovery()
                        }
                    })
                }
            }
        })
    },
    startBluetoothDevicesDiscovery(e) {
        //开始搜寻附近的蓝牙外围设备
        console.log("开始搜寻附近的蓝牙外围设备", e)
        wx.hideNavigationBarLoading(); //结束加载动画
        wx.stopPullDownRefresh(); //停止当前页面的下拉刷新
        // if (this._discoveryStarted) {
        //     return
        // }
        // this._discoveryStarted = true
        // //置为1
        wx.startBluetoothDevicesDiscovery({
            serivces: [],
            allowDuplicatesKey: false,
            success: (res) => {
                console.log('startBluetoothDevicesDiscovery success', res)
                this.onBluetoothDeviceFound()
                //监听寻找到新设备的事件
            },
        })
    },
    stopBluetoothDevicesDiscovery() {
        //停止搜寻附近的蓝牙外围设备
        wx.stopBluetoothDevicesDiscovery({
            success: (res) => {
                console.log('stopstopBluetoothDevicesDiscovery success', res)
            },
            fail: (err) => {
                console.log('stopstopBluetoothDevicesDiscovery fail', err)
            }
        })
    },
    onBluetoothDeviceFound() {
        //监听寻找到新设备的事件
        wx.onBluetoothDeviceFound((res) => {
            console.log("监听寻找到新设备的事件", res)
            res.devices.forEach(device => {
                if (!device.name && !device.localName) {
                    return
                }
                const foundDevices = this.data.devices
                const idx = inArray(foundDevices, 'deviceId', device.deviceId)
                const data = {}
                if (idx === -1) {
                    data[`devices[${foundDevices.length}]`] = device
                } else {
                    data[`devices[${idx}]`] = device
                }
                this.setData(data)
            })
        })
    },
    closeBluetoothAdapter() {
        wx.closeBluetoothAdapter({
            success: (res) => {
                console.log("close booth", res)
            },
            fail: (error) => {
                console.log("close fail", error)
            },
        })
    },
    onLianTap: function (event) {
        wx.stopBluetoothDevicesDiscovery({
            success: (res) => {
                console.log('停止搜索设备', res)
            }
        })
        console.log(event)
        var title = event.currentTarget.dataset.deviceId;
        console.log("title", title)
        var name = event.currentTarget.dataset.name;
        console.log("name", name)
        wx.navigateTo({
            url: '../detail/detail?id=' + title + '&name=' + name
        })

        // const ds = e.currentTarget.dataset
        // const deviceId = ds.deviceId
        // const name = ds.name
        // wx.createBLEConnection({
        //     deviceId,
        //     success: (res) => {
        //         wx.vibrateLong({
        //             success: (res => {
        //                 console.log("连接成功", res)
        //             })
        //         })
        //         this.setData({
        //             connected: true,
        //             name,
        //             deviceId,
        //         })
        //         var title = event.currentTarget.dataset.de

        //     }
        // })
        // this.stopBluetoothDevicesDiscovery()

        // wx.stopBluetoothDevicesDiscovery({
        //     success: (res => {
        //         console.log("停止搜索设备",res)
        //     })
        // })
        // let title = event.currentTarget.dataset.deviceId;
        // let name = event.currentTarget.dataset.
    },

    clearBluetoothDevices() {
        this.setData({
            devices: [],
            chs: []
        })
    },


    /**
 * 生命周期函数--监听页面初次渲染完成
 */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {


    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        let that = this;
        console.log("开始下拉刷新")
        wx.showNavigationBarLoading();//加载动画开始
        that.stopBluetoothDevicesDiscovery();//停止搜索
        that.clearBluetoothDevices();//清除列表
        that.closeBluetoothAdapter();//关闭蓝牙
        that.openBluetoothAdapter();//开始搜索
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})