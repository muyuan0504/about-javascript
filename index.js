this.imPomelo.on('disconnect', () => {
    this.hasReconnect = false;
    console.log('检测到断开链接，尝试重连');
    this.imPomeloReconnectItv = setInterval(() => {
        if (window.navigator.onLine && !this.hasReconnect) {
            // 如果当前有网络并且处于未重新连接上的状态
            this.connectIM();
        }
    }, 10000);
});

let timer = setInterval(() => {
    that.imConnectTime += 1;
    if (that.imConnectTime == 2) {
        that.timeNum = parseInt(Math.random() * (30 - 10 + 1) + 10, 10);
    } else if (that.imConnectTime == 3) {
        that.timeNum = parseInt(Math.random() * (60 - 30 + 1) + 30, 10);
    }
    if (that.imConnectTime > 3) {
        that.timeNum = parseInt(Math.random() * (900 - 600 + 1) + 600, 10);
    }
    if (window.navigator.onLine && !that.hasReconnect) {
        // 如果当前有网络并且处于未重新连接上的状态则发起websocket初始化;
        that.connectIM();
    } else if (that.hasReconnect) {
        // 已经重连上了重置重连状态
        that.imConnectTime = 1;
        that.timeNum = parseInt(Math.random() * (10 - 3 + 1) + 3, 10);
        clearInterval(timer);
        return;
    }
    that.createTimer();
    clearInterval(timer);
}, that.timeNum * 1000);
