// pages/send/send.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ConnectionStatus: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            deviceName: options.name,
            deviceId: options.id
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
        //停止搜寻附近的蓝牙外围设备
        wx.showLoading({
            title: 'Connect...',
        });
        this.createBLEConnection();
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

    },

    Start_recording: function (e) {
        console.log(e);
        let that = this;
        if (this.data.ConnectionStatus == false) {
            wx.showToast({
                title: 'Connecting...',
                icon: 'loading',
                duration: 1000
            });
        } else {
            wx.showToast({
                title: 'Start recording',
                icon: 'success',
                duration: 1000
            })
            const value = 'a\r\n';
            const arrayBuffer = wx.base64ToArrayBuffer(value)
            console.log(arrayBuffer)
            that.writeBLECharacteristicValue(value)
        }

    },

    View_status: function (e) {
        console.log(e);
        // const value = 'd\r\n';
        // that.writeBLECharacteristicValue(value)
        wx.navigateTo({
            url: '../cam/cam',
        })
    },

    Reproduce: function (e) {
        console.log(e);
        let that = this;
        if (this.data.ConnectionStatus == false) {
            wx.showToast({
                title: 'Connecting...',
                icon: 'loading',
                duration: 1000
            });
        } else {
            wx.showToast({
                title: 'Reproduce',
                icon: 'success',
                duration: 1000
            })
            const value = 'b\r\n';
            that.writeBLECharacteristicValue(value)
        }
    },

    Erase: function (e) {
        console.log(e);
        let that = this;
        if (this.data.ConnectionStatus == false) {
            wx.showToast({
                title: 'Connecting...',
                icon: 'loading',
                duration: 1000
            })
        } else {
            wx.showToast({
                title: 'Erase',
                icon: 'success',
                duration: 1000
            })
            const value = 'c\r\n';
            that.writeBLECharacteristicValue(value)
        }
    },

    createBLEConnection() {
        //创建连接
        wx.createBLEConnection({
            //创建连接
            deviceId: this.data.deviceId,
            success: (res) => {
                wx.hideLoading();
                this.setData({
                    ConnectionStatus: true
                })
                console.log("连接成功", res);
                this.getBLEDeviceServices();
            },
            fail: (res) => {
                console.log("连接失败", res)
                if (res.errMsg == 'createBLEConnection:fail:already connect') {
                    console.log("已经连接")
                    wx.hideLoading();
                }
            }
        })
    },

    getBLEDeviceServices() {
        //获取服务UUID
        let that = this;
        wx.getBLEDeviceServices({
            deviceId: that.data.deviceId,
            success: (res) => {
                console.log('device services', res.services)
                for (let index = 0; index < res.services.length; index++) {
                    if (res.services[index].isPrimary) {
                        that.setData({
                            serviceId: res.services[index].uuid
                        })
                        that.getBLEDeviceCharacteristics(that.data.deviceId, that.data.serviceId);
                        return
                    }
                }
            },
        })
    },

    //使用TLS-01模块

    getBLEDeviceCharacteristics(deviceId, serviceId) {
        //获取特征值
        var that = this;
        wx.getBLEDeviceCharacteristics({
            deviceId,
            serviceId,
            success: (res) => {
                console.log('getBLEDeviceCharacteristics success', res.characteristics)
                for (let i = 0; i < res.characteristics.length; i++) {
                    let item = res.characteristics[i]
                    if (item.properties.notify) {
                        wx.notifyBLECharacteristicValueChange({
                            deviceId: deviceId,
                            serviceId: serviceId,
                            characteristicId: item.uuid,
                            state: true,
                            success: (res) => {
                                console.log("notify", res)
                            },
                            fail: (error) => {
                                console.log("error", error)
                            }
                        })
                    }

                    if (item.uuid.slice(4, 8) == 'FEE2' || item.uuid.slice(4, 8) == 'fee2') {
                        that.setData({
                            writecharacteristics: item.uuid
                        })
                        console.log("writecharacteristics", that.data.writecharacteristics)
                    }
                }
                // that.writeBLECharacteristicValue()
            },
            fail(res) {
                console.error('getBLEDeviceCharacteristics', res)
            }
        })
    },


    closeBLEConnection() {
        wx.closeBLEConnection({
            deviceId: this.data.deviceId
        })
        this.setData({
            connected: false,
            chs: [],
            canWrite: false,
        })
    },


    writeBLECharacteristicValue(value) {
        var that = this
        console.log("write", value)
        let buffer = this.stringToBytes(value)
        // const arrayBuffer = wx.base64ToArrayBuffer(value)
        // console.log("write", arrayBuffer)
        wx.writeBLECharacteristicValue({
            deviceId: that.data.deviceId,
            serviceId: that.data.serviceId,
            characteristicId: that.data.writecharacteristics,
            value: buffer,
            success: function (res) {
                console.log("成功", res)
            },
        })
    },


    closeBluetoothAdapter() {
        wx.closeBluetoothAdapter({
            success: (res) => {
                console.log('closeBluetoothAdapter success', res)
            },
            fail: (err) => {
                console.log('closeBluetoothAdapter fail', err)
            }
        })
        this._discoveryStarted = false
    },

    stringToBytes(str) {
        var array = new Int8Array(str.length)
        for (var i = 0; i < str.length; i++) {
            array[i] = str.charCodeAt(i)
        }
        return array.buffer
    }

})