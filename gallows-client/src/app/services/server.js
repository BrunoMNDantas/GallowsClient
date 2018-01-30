"use strict";
var Server = (function () {
    function Server() {
    }
    Server.BASE = 'http://gsmrprobe.politecid.ipl.pt:80/client';
    Server.LOGIN = Server.BASE + '/logIn';
    Server.CHANGE_PASSWORD = Server.BASE + '/changeUserSettings';
    Server.MINI_OBUS = Server.BASE + '/getProbeList';
    Server.OBU_BY_ID = Server.BASE + '/getProbeInfo/{obuId}';
    Server.UPDATE_OBU = Server.BASE + '/updateObu/{obuId}';
    Server.CREATE_OBU = Server.BASE + '/addObu';
    Server.REQUEST_CC = Server.BASE + '/requestCC/{obuId}';
    Server.MINI_RAILWAYS = Server.BASE + '/getRailwayList';
    Server.RAILWAY_BY_ID = Server.BASE + '/getRailwayInfo/{railwayId}';
    Server.RAILWAY_PATH = Server.BASE + '/getRailwayCoordinates/{railwayId}';
    Server.RAILWAY_PATH_BY_PK_VERSION = Server.BASE + '/getRailwayCoordinates/{railwayId}/{pkVersion}';
    Server.DELETE_RAILWAY = Server.BASE + '/deleteRailway/{railwayId}';
    Server.UPLOAD_PKS_RAILWAY = Server.BASE + '/uploadPKs/{railwayId}';
    Server.UPDATE_RAILWAY = Server.BASE + '/updateRailway/{railwayId}';
    Server.CREATE_RAILWAY = Server.BASE + '/addRailway';
    Server.MINI_CONFIGURATIONS = Server.BASE + '/getConfigList';
    Server.CONFIGURATION_BY_ID = Server.BASE + '/getConfigInfo/{configurationId}';
    Server.CONFIGURATION_DOWNLOAD = Server.BASE + '/downloadConfig/{configurationId}';
    Server.DELETE_CONFIGURATION = Server.BASE + '/deleteConfig/{configurationId}';
    Server.CREATE_CONFIGURATION = Server.BASE + '/uploadConfig';
    Server.SCAN_LOG = Server.BASE + '/getScanLogList/{obuId}';
    Server.SCAN_LOG_DOWNLOAD = Server.BASE + '/downloadScanLog/{obuId}/{orderNumber}';
    Server.SYSTEM_LOG = Server.BASE + '/getSysLogList/{obuId}';
    Server.SYSTEM_LOG_DOWNLOAD = Server.BASE + '/downloadSysLog/{obuId}/{orderNumber}';
    Server.START_SESSION = Server.BASE + '/startSession';
    Server.RENEW_SESSION = Server.BASE + '/renewSession/{sessionId}';
    Server.END_SESSION = Server.BASE + '/endSession/{sessionId}';
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map