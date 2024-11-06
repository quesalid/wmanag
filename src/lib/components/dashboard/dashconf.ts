// DashBoard Configurator class

export interface Widget {
    id: string;
    name: string;
    width: number;
    height: number;
    top?: number;
    left?: number;
    isSelected?: boolean;
    isDragging?: boolean;
    image?: string;
    minimized?: string;
    mimimizedHeight: number;
    normalHeight: number;
    params?: any;
}
export class DashConf {
    availableWidgets: Widget[] =[]
    dashboardWidgets: Widget[] = []
    constructor(availableWidgets: Widget[], dashboardWidgets: Widget[]){
        this.availableWidgets = availableWidgets
        this.dashboardWidgets = dashboardWidgets
    }

    
    getAvailableWidgets(){
        return this.availableWidgets
    }

    setDashboardWidgets(widgets: Widget[]) {
        this.dashboardWidgets = widgets
    }

    getDashboardWidgets(){
        return this.dashboardWidgets
    }

    setAvailableWidgets(widgets: Widget[]) {
        this.availableWidgets = widgets
    }

}

