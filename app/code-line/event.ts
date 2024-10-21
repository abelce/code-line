import EventEmitter from "eventemitter3"
export const CodeLineEvent = new EventEmitter()

export const event_calc_frame_height = "calc_frame_height"; // 重新计算frame高度

export const event_hidden_editor_textarea = "hidden_hidden_editor_textarea";// 隐藏编辑输入框
export const event_show_editor_textarea = "hidden_show_editor_textarea";// 显示编辑输入框