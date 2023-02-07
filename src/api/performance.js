//绩效评估API
import request from './PerfRequest'

/**
 * @description: 获取所有组织架构、所有用户
 */
export function apiDepartmentUser(params) {
  return request({
    url: '/common/system/department-user',
    method: 'get',
    params,
  })
}
/**
 * @description: 获取所有用户
 */
export function apiSystemUser(params) {
  return request({
    url: '/common/system/user',
    method: 'get',
    params,
  })
}
/**
 * @description: 获取用户详细信息
 */

export function ApiSystemUserInfo(params) {
  return request({
    url: `/common/system/user-info`,
    method: 'GET',
    params
  })
}
/**
 * @description: 获取周期列表
 */
export function apiPersonalPeriodList(params) {
  return request({
    url: '/performance/personal/period-list',
    method: 'get',
    params,
  })
}

// /**
//  * @description: 获取项目     (接口删除)
//  */
// export function apiProjectList(params) {
//   return request({
//     url: '/performance/personal/project-list',
//     method: 'get',
//     params,
//   })
// }
/**
 * @description: 获取流程
 */
export function apiFlowList(params) {
  return request({
    url: '/performance/personal/flow-list',
    method: 'get',
    params,
  })
}

/**
 * @description: 更新内容
 */
export function apiUpdateContent(data) {
  return request({
    url: '/performance/personal/update-content',
    method: 'post',
    data,
  })
}
//团队绩效
/**
 * @description: 获取360°评估人
 */
export function apiTeamGetEvaluationUser(data) {
  return request({
    url: '/performance/team/get-evaluation-user',
    method: 'post',
    data,
  })
}

/**
 * @description: 团队绩效项目中的流程列表
 */
export function apiTeamFlowList(params) {
  return request({
    url: 'performance/team/flow-list',
    method: 'get',
    params,
  })
}
/**
 * @description: 团队绩效列表
 */
export function apiTeamList(params) {
  return request({
    url: '/performance/team/list',
    method: 'get',
    params,
  })
}
/**
 * @description: 团队绩效列表操作：绩效校准
 */
export function apiTeamCalibration(data) {
  return request({
    url: '/performance/team/calibration',
    method: 'post',
    data,
  })
}
/**
 * @description: 获取团队绩效单个内容
 */
export function apiTeamPerformanceCalibrationContent(params) {
  return request({
    url: '/performance/team/performance-calibration-content',
    method: 'get',
    params,
  })
}
/**
 * @description: 确认工作总结及360°评估关系
 */
export function apiTeamConfirmEvaluation(data) {
  return request({
    url: '/performance/team/confirm-evaluation',
    method: 'POST',
    data,
  })
}
/**
 * @description: 填写直接下级的绩效评估
 */
export function apiTeamPerformanceEvaluation(data) {
  return request({
    url: '/performance/team/performance-evaluation',
    method: 'post',
    data,
  })
}
/**
 * @description: 完成团队的绩效校准
 */
export function apiTeamPerformanceCalibration(data) {
  return request({
    url: '/performance/team/performance-calibration',
    method: 'post',
    data,
  })
}
/**
 * @description: 进行直接下级绩效沟通并开通结果
 */
export function apiTeamOpenResult(data) {
  return request({
    url: '/performance/team/open-result',
    method: 'post',
    data,
  })
}
//对他人的评估
/**
 * @description: 获取360°评估列表
 */
export function apiToOthersList(params) {
  return request({
    url: '/performance/to-others/list',
    method: 'get',
    params,
  })
}
/**
 * @description: 获取关系类型
 */
export function apiCommonSelectList(params) {
  return request({
    url: '/common/select/list',
    method: 'get',
    params,
  })
}
/**
 * @description: 拒绝评估
 */
export function apiToOthersRefuse(data) {
  return request({
    url: '/performance/to-others/refuse',
    method: 'post',
    data
  })
}

/**
 * @description: 获取绩效结果查看
 */
export function apiResultViewFlowContent(params) {
  return request({
    url: '/performance/personal/result-view/flow-content',
    method: 'get',
    params
  })
}

/**
 * @description: 绩效结果确认
 */
export function apiResultViewUpdateContent(data) {
  return request({
    url: '/performance/personal/result-view/update-content',
    method: 'post',
    data
  })
}

/**
 * @description: 获取上级评估流程内容
 */
export function apiTeamSuperiorEvaluateContent(params) {
  return request({
    url: '/performance/team/superior-evaluate-content',
    method: 'get',
    params
  })
}

/**
 * @description: 流程详细配置信息（提示截止时间）
 */
export function apiPersonalFlowInfo(params) {
  return request({
    url: '/performance/personal/flow-info',
    method: 'get',
    params
  })
}
/**
 * @description: 获取上级评估 历史成绩
 */
export function apiHistoricalPerformance(params) {
  return request({
    url: '/performance/team/get-history-score',
    method: 'get',
    params
  })
}

/**
 * @description: 展示各个等级的占比上级评估、绩效校准、结果沟通 环节，展示出来   总人数、各等级人数、各等级人数占总人数的占比
 */
export function apiTeamGradeDistribution(params) {
  return request({
    url: '/performance/team/grade-distribution',
    method: 'get',
    params
  })
}

//获取名字弹窗数据接口
/**
 * @description: 获取被评估人的评估分数
 */
export function apiToOthersScoreList(params) {
  return request({
    url: '/performance/to-others/score-list',
    method: 'get',
    params
  })
}

/**
 * @description: 获取 别人给我评估
 */
export function apiToOthersContent(params) {
  return request({
    url: '/performance/to-others/content',
    method: 'get',
    params
  })
}

/**
 * @description: 获取 我给他人评估
 */
export function apiToOthersEvaluateOther(params) {
  return request({
    url: '/performance/to-others/evaluate-other',
    method: 'get',
    params
  })
}


/**
 * @description: 获取绩效申诉分数配置默认信息
 */

export function getAppealScoreConfigApi(params) {
  return request({
    url: '/performance/appeal/score-config',
    method: 'get',
    params
  })
}

/**
 * @description: 发起绩效申诉
 */

export function createAppealApi(data) {
  return request({
    url: '/performance/appeal/create',
    method: 'post',
    data
  })
}

/**
 * @description: 我的申诉列表
 */
export function getMyAppealListApi(params) {
  return request({
    url: '/performance/appeal/list',
    method: 'get',
    params
  })
}

/**
 * @description: 我的申诉详情
 */
export function getMyAppealInfoApi(params) {
  return request({
    url: '/performance/appeal/info',
    method: 'get',
    params
  })
}

/**
 * @description: 我的申诉参考详情
 */
export function getMyAppealReferenceInfoApi(params) {
  return request({
    url: '/performance/appeal/reference-info',
    method: 'get',
    params
  })
}


/**
 * @description: 被评估人的申诉列表|下级的申诉列表  type 1 : hrbp 2: 下级
 */
export function getHrbpOrSuperiorsAppealListApi(params) {
  return request({
    url: '/performance/appeal/process-list',
    method: 'get',
    params
  })
}


/**
 * @description: 获取HRBP上次提交信息
 */
export function getHrbpAppealInfoApi(params) {
  return request({
    url: '/performance/appeal/hr-info',
    method: 'get',
    params
  })
}

/**
 * @description: 获取HRBP参考详情
 */
export function getHrbpAppealReferenceInfoApi(params) {
  return request({
    url: '/performance/appeal/hr-reference-info',
    method: 'get',
    params
  })
}

/**
 * @description: 提交HRBP或者上级填写的申诉信息
 */
export function submitHrbpOrSuperiorsAppealApi(data) {
  return request({
    url: '/performance/appeal/process',
    method: 'post',
    data
  })
}

/**
 * @description: 获取上级 上次提交信息
 */
export function getSuperiorsAppealInfoApi(params) {
  return request({
    url: '/performance/appeal/superior-info',
    method: 'get',
    params
  })
}

/**
 * @description: 获取上级 上次提交参考详情
 */
export function getSuperiorsAppealReferenceInfoApi(params) {
  return request({
    url: '/performance/appeal/superior-reference-info',
    method: 'get',
    params
  })
}

/**
 * @description: 获取上级 上次提交参考详情
 */
export function getAppealProjectListApi(params) {
  return request({
    url: '/performance/appeal/project-list',
    method: 'get',
    params
  })
}

/**
 * @description: 获取是否可以发起绩效申诉和申诉后成绩
 */
export function getIsAppealCreateApi(params) {
  return request({
    url: '/performance/appeal/possibility',
    method: 'get',
    params
  })
}

/**
 * @description: 提交我的申诉确认结果
 */
export function submitAppealConfirmApi(data) {
  return request({
    url: '/performance/appeal/confirm',
    method: 'post',
    data
  })
}


/**
 * @description: 用户图谱关系
 */

export function getUserRelationApi(params) {
  return request({
    url: '/performance/relation-graph/personal-map',
    method: 'get',
    params
  })
}

export function getTeamRelationApi(params) {
  return request({
    url: '/performance/relation-graph/network',
    method: 'get',
    params
  })
}
//=========================月度绩效相关接口===========================

/**
 * @description: 获取指标库列表
 */
export function APIIndicatorList(params) {
  return request({
    url: '/performance/personal/indicator/list',
    method: 'get',
    params
  })
}
/**
 * @description: 新建目标
 */
export function APIIndicatorAdd(data) {
  return request({
    url: '/performance/personal/indicator/add',
    method: 'post',
    data
  })
}
/**
 * @description: 更新目标
 */
export function APIIndicatorUpdate(data) {
  return request({
    url: '/performance/personal/indicator/update',
    method: 'post',
    data
  })
}

/**
 * @description: 删除目标
 */
export function APIIndicatorDelete(data) {
  return request({
    url: '/performance/personal/indicator/delete',
    method: 'post',
    data
  })
}
/**
 * @description: 提交目标
 */
export function APIIndicatorCommit(data) {
  return request({
    url: '/performance/personal/indicator/commit',
    method: 'post',
    data
  })
}
/**
 * @description: 获取指定周期目标列表
 */
export function APIIndicatorExecuteList(params) {
  return request({
    url: '/performance/personal/indicator/execute-list',
    method: 'get',
    params
  })
}
/**
 * @description: 复制目标
 */
export function APIIndicatorCopy(data) {
  return request({
    url: '/performance/personal/indicator/copy',
    method: 'post',
    data
  })
}
/**
 * @description: 撤回目标
 */
export function APIIndicatorRecall(data) {
  return request({
    url: '/performance/personal/indicator/recall',
    method: 'post',
    data
  })
}
/**
 * @description: 获取OKR
 */
export function APIIndicatorOkrList(params) {
  return request({
    url: '/performance/personal/indicator/okr-list',
    method: 'get',
    params
  })
}
/**
 * @description: 获取360推荐评估人
 */
export function APIIndicatorRector(params) {
  return request({
    url: '/performance/personal/recommend-evaluator',
    method: 'get',
    params
  })
}
/**
 * @description: 审核目标
 */
export function APITeamIndicatorAudit(data) {
  return request({
    url: '/performance/team/indicator-audit',
    method: 'post',
    data
  })
}
/*
 * @description: 获取 状态
 */
export function apiSelectList(params) {
  return request({
    url: `/common/select/list`,
    method: 'GET',
    params
  })
}
/*
 * @description: 获取考核分组
 */
export function apiCalibrationGroup(params) {
  return request({
    url: `/performance/team/get-calibration-group`,
    method: 'GET',
    params
  })
}

/**
 * @description: 获取可编辑状态
 */
export function APIGetIsEdit(data) {
  return request({
    url: 'performance/team/get-is-edit',
    method: 'post',
    data
  })
}

/**
 * @description: 获取行为数据
 */
export function APIGetUserBehavior(params) {
  return request({
    url: 'performance/team/get-user-behavior',
    method: 'get',
    params
  })
}

/**
 * @description: 标签列表
 */
export function APItagList(params) {
  return request({
    url: 'tag/list',
    method: 'get',
    params
  })
}
/**
 * @description: 标签详情
 */
export function APItagInfo(params) {
  return request({
    url: 'tag/info',
    method: 'get',
    params
  })
}
/**
 * @description: 标签添加
 */
export function APItagAdd(data) {
  return request({
    url: 'tag/add',
    method: 'post',
    data
  })
}
/**
 * @description: 标签删除
 */
export function APItagDelete(data) {
  return request({
    url: 'tag/delete',
    method: 'post',
    data
  })
}
/**
 * @description: 获取评估分数
 */
export function APIEvaluatorScore(data) {
  return request({
    url: 'performance/personal/evaluator-score',
    method: 'post',
    data
  })
}
/**
 * @description: 获取ehi 2
 */
export function APIGetUserDimensionEhi2(params) {
  return request({
    url: '/performance/team/get-user-dimension-ehi2',
    method: 'get',
    params
  })
}
/**
 * @description: 获取ehi 1
 */
export function APIGetUserDimensionEhi1(params) {
  return request({
    url: '/performance/team/get-user-dimension-ehi1',
    method: 'get',
    params
  })
}
/**
 * @description: 获取bhi
 */
export function APIGetUserDimensionBhi(params) {
  return request({
    url: '/performance/team/get-user-dimension-bhi',
    method: 'get',
    params
  })
}

/**
 * @description: 确认工作总结及360°评估关系  驳回
 */
export function APITeamReject(data) {
  return request({
    url: '/performance/team/reject',
    method: 'post',
    data
  })
}
/**
 * @description: 暂存接口
 * 给他人评估和自评，结果沟通。点击保存调用这个
 */
export function APISaveContent(data) {
  return request({
    url: '/performance/personal/save-content',
    method: 'post',
    data
  })
}
/**
 * @description: 操作记录获取
 *
 */
export function APIOperationLog(params) {
  return request({
    url: '/performance/log/operation-log',
    method: 'GET',
    params
  })
}

/**
 * @description: 获取主动评估人列表数据
 */
export function getActiveEvaluateUser(params) {
  return request({
    url:'performance/to-others/get-active-evaluate-user',
    method:'GET',
    params
  })
}

/**
 * @description: 我要评估数据提交
 */
export function activeEvaluate(params) {
  return request({
    url: 'performance/to-others/active-evaluate',
    method: 'POST',
    params
  })
}

/**
 * @description: 获取环评评语数据
 */
export function getEvaluateComment(params) {
  return request({
    url: 'performance/to-others/get-evaluate-comment',
    method: 'GET',
    params
  })
}

/**
 * @description: 获取金牌环评人
 * period_id
 */
export function APIGetGoldMedalUser(params) {
  return request({
    url: 'performance/to-others/get-gold-medal-user',
    method: 'get',
    params
  })
}
/**
 * @description: 价值观的请求接口
 * period_id
 */
export function APIUpdateContent(data) {
  return request({
    url: '/performance/personal/update-content',
    method: 'post',
    data
  })
}
/**
 * @description: 团队绩效图谱获取当前登录人负责的部门
 * period_id
 */
export function APIRelationGraphDepartment(params) {
  return request({
    url: '/performance/relation-graph/department',
    method: 'get',
    params
  })
}
