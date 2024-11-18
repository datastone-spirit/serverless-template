/*
 * @Author: mulingyuer
 * @Date: 2024-11-01 17:15:10
 * @LastEditTime: 2024-11-01 17:23:27
 * @LastEditors: mulingyuer
 * @Description: 上下文菜单
 * @FilePath: \serverless-api-tester\src\background\context-menus\types.ts
 * 怎么可能会有bug！！！
 */
import type { CreateMenuOptions } from "@/utils/chrome-context-menus";
import { ContextMenuEnum } from "./strategy/context-menu-enum";

/** menu菜单策略 */
export type ContextMenuStrategy = Partial<Record<ContextMenuEnum, () => CreateMenuOptions[]>>;
