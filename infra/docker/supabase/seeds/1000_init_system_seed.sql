

insert into system.stat_period_settings (
    code,
    effective_from
)
values (
    'tunnel_progress',
    '2025-01-01'
);

-- =========================================
-- ROOT MENUS
-- =========================================

insert into system.menus (
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
values
(
  'dashboard',
  'dashboard',
  '总览',
  'dashboard',
  '/dashboard',
  'LayoutDashboard',
  0,
  'dashboard.read'
),

(
  'hrm',
  'HumanResourceManagement',
  '组织管理',
  'hrm',
  null,
  'TrainFrontTunnel',
  1,
  'hrm.read'
),
(
  'proj',
  'ProjectManagement',
  '项目管理',
  'project',
  null,
  'FolderKanban',
  1,
  'proj.read'
),
(
  'equip',
  'EquipmentManagement',
  '设备管理',
  'equip',
  null,
  'FolderKanban',
  1,
  'equip.read'
),
(
  'system',
  'SystemManagement',
  '系统设置',
  'system',
  null,
  'Settings',
  2,
  'system.read'
);


-- =========================================
-- HRM
-- =========================================

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'hrm.organizations',
  'organizations',
  '组织系统',
  'organizations',
  '/hrm/organizations',
  'Building2',
  0,
  'organization.read'
from system.menus
where code = 'hrm';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'hrm.employees',
  'employees',
  '员工管理',
  'employees',
  '/hrm/employees',
  'Users',
  1,
  'employee.read'
from system.menus
where code = 'hrm';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'proj.projects',
  'projects',
  '项目管理',
  'projects',
  '/proj/projects',
  'FolderKanban',
  2,
  'project.read'
from system.menus
where code = 'proj';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'proj.tunnels',
  'tunnels',
  '隧道管理',
  'tunnels',
  '/proj/tunnels',
  'TrainFrontTunnel',
  3,
  'tunnel.read'
from system.menus
where code = 'proj';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'equip.tbms',
  'tbms',
  '盾构机管理',
  'tbms',
  '/equip/tbms',
  'TrainFrontTunnel',
  4,
  'tbm.read'
from system.menus
where code = 'equip';


-- =========================================
-- SYSTEM
-- =========================================

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.master',
  'master',
  '主数据管理',
  'master',
  '/system/master',
  'BookMarked',
  0,
  null
from system.menus
where code = 'system';

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.master.master_data',
  'master_data',
  '主数据管理',
  'master_data',
  '/system/master/master-data',
  'BookMarked',
  0,
  null
from system.menus
where code = 'system.master';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.master.countries',
  'countries',
  '国家管理',
  'countries',
  '/system/master/countries',
  'Globe',
  1,
  null
from system.menus
where code = 'system.master';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.master.admin_regions',
  'admin_regions',
  '行政区管理',
  'admin_regions',
  '/system/master/admin-regions',
  'Map',
  2,
  null
from system.menus
where code = 'system.master';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.project',
  'project',
  '项目分类标准',
  'project',
  '/system/project',
  'Folders',
  3,
  null
from system.menus
where code = 'system';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.project.project_catalog_std',
  'project_catalog_std',
  '项目分类标准',
  'project_catalog_std',
  '/system/project/project-catalog-std',
  'Folders',
  3,
  null
from system.menus
where code = 'system.project';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.tbm',
  'tbm',
  '盾构机管理',
  'tbm',
  '/system/tbm',
  'Folders',
  3,
  null
from system.menus
where code = 'system';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.tbm.parameter',
  'parameter',
  '参数管理',
  'parameter',
  '/system/tbm/parameter',
  'Folders',
  1,
  null
from system.menus
where code = 'system.tbm';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.tbm.parameter_template',
  'parameter_template',
  '参数模板管理',
  'parameter_template',
  '/system/tbm/parameter-template',
  'Folders',
  2,
  null
from system.menus
where code = 'system.tbm';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order,
  permission_code
)
select
  id,
  'system.tbm.mqtt',
  'mqtt',
  'MQTT管理',
  'mqtt',
  '/system/tbm/mqtt',
  'Folders',
  3,
  null
from system.menus
where code = 'system.tbm';


-- =========================================
-- TUNNEL WORKSPACE
-- =========================================

insert into system.menus (
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
values
(
  'engineering',
  'engineering',
  '隧道管理',
  'engineering',
  'workspace/tunnel/engineering/:id',
  'LayoutDashboard',
  'tunnel_workspace',
  0
),
(
  'monitor',
  'monitor',
  '远程监控',
  'monitor',
  'workspace/tunnel/monitor/:id',
  'TrainFrontTunnel',
  'tunnel_workspace',
  1
),
(
  'operation',
  'operation',
  '运维管理',
  'operation',
  'workspace/tunnel/operation/:id',
  'Settings',
  'tunnel_workspace',
  2
),
(
  'risk',
  'risk',
  '风险预警',
  'risk',
  'workspace/tunnel/risk/:id',
  'AlertTriangle',
  'tunnel_workspace',
  3
),
(
  'health',
  'health',
  '健康诊断',
  'health',
  'workspace/tunnel/health/:id',
  'HeartPulse',
  'tunnel_workspace',
  4
),
(
  'data',
  'data',
  '数据中心',
  'data',
  'workspace/tunnel/data/:id',
  'Database',
  'tunnel_workspace',
  5
),
(
  'material',
  'material',
  '资料中心',
  'material',
  'workspace/tunnel/material/:id',
  'BookOpen',
  'tunnel_workspace',
  6
),
(
  'settings',
  'settings',
  '系统设置',
  'settings',
  'workspace/tunnel/settings/:id',
  'Settings',
  'tunnel_workspace',
  7
);

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
select
   parent.id,
   child.code,
   child.name,
   child.label,
   child.node_key,
   child.path_url,
   child.icon,
   child.menu_scope,
   child.sort_order
from system.menus parent
cross join (
  values
    (
      'engineering.overview',
      'overview',
      '总览',
      'overview',
      'engineering/overview',
      'TrainFrontTunnel',
      'tunnel_workspace',
      0
    ),
    (
     'engineering.general',
      'general',
      '概况总览',
      'general',
      'engineering/general',
      'TrainFrontTunnel',
      'tunnel_workspace',
      1
    ),
    (
      'engineering.progress',
      'progress',
      '进度管理',
      'progress',
      'engineering/progress',
      'TrainFrontTunnel',
      'tunnel_workspace',
      2
    ),
    (
      'engineering.employees',
      'employees',
      '人员管理',
      'employees',
      'engineering/employees',
      'Users',
      'tunnel_workspace',
      3
    ),
    (
      'engineering.process',
      'process',
      '工序管理',
      'process',
      'engineering/process',
      'Project',
      'tunnel_workspace',
      4
    ),
   (
      'engineering.geo',
      'geo',
      '地质信息',
      'geo',
      'engineering/geo',
      'Map',
      'tunnel_workspace',
      5
    ),
    (
      'engineering.plan',
      'plan',
      '年度计划',
      'plan',
      'engineering/plan',
      'Calendar',
      'tunnel_workspace',
      6
    )
  ) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
where parent.code = 'engineering';




insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
select
   parent.id,
   child.code,
   child.name,
   child.label,
   child.node_key,
   child.path_url,
   child.icon,
   'tunnel_workspace',
   child.sort_order
from system.menus parent
cross join (
  values
    (
        'monitor.tbm_monitor',
        'tbm_monitor',
        '盾构机监控',
        'tbm_monitor',
        'monitor/tbm_monitor',
        'TrainFrontTunnel',
        0
  ),
  (
        'monitor.video_monitor',
        'video_monitor',
        '视频监控',
        'video_monitor',
        'monitor/video_monitor',
        'VideoCamera',
        1
  )
) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
where parent.code = 'monitor';

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)select
  parent.id,
  child.code,
  child.name,
  child.label,
  child.node_key,
  child.path_url,
  child.icon,
  'tunnel_workspace',
  child.sort_order
from system.menus parent
cross join (
  values 
  ( 
      'operation.shutdown',
      'shutdown',
      '停机申报',
      'shutdown',
      'operation/shutdown',
      'Tool',
      0
  ),
  (
      'operation.soilVolume',
      'soilVolume',
      '渣土体积',
      'soilVolume',
      'operation/soil-volume',
      'Tool',
      1
  ),
  (
      'operation.erector',
      'erector',
      '拼装管理',
      'erector',
      'operation/erector',
      'Tool',
      2
  ),
  (  
      'operation.material',
      'material',
      '材料消耗',
      'material',
      'operation/material',
      'Tool',
      3
  ),
  (
      'operation.oil',
      'oil',
      '油品消耗',
      'oil',
      'operation/oil',
      'Tool',
      4
  ),
  (
      'operation.fault',
      'fault',
      '故障管理',
      'fault',
      'operation/fault',
      'Tool',
      5
  )
  ) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
where parent.code = 'operation';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)select
  parent.id,
  child.code,
  child.name,
  child.label,
  child.node_key,
  child.path_url,
  child.icon,
  'tunnel_workspace',
  child.sort_order
from system.menus parent
cross join (
  values 
  (  
      'risk.key_parameter',
      'key_parameter',
      '关键参数预警',
      'key_parameter',
      'risk/key-parameter',
      'AlertTriangle',
      0
  ),(
      'risk.geo',
      'geo',
      '地质风险源预警',
      'geo',
      'risk/geo',
      'Map',
      1
  ),
  (
      'risk.settlement',
      'settlement',
      '沉降预警',
      'settlement',
      'risk/settlement',
      'AlertTriangle',
      2
  ),
  (
      'risk.equipment',
      'equipment',
      '设备报警',
      'equipment',
      'risk/equipment',
      'AlertTriangle',
      3
  )
  ) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
where parent.code = 'risk';



insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
select
  parent.id,
  child.code,
  child.name,
  child.label,
  child.node_key,
  child.path_url,
  child.icon,
  'tunnel_workspace',
  child.sort_order
from system.menus parent
cross join (
  values
    (
      'health.segment',
      'segment',
      '管片质量',
      'segment',
      'health/segment',
      'HeartPulse',
      0
    ),
    (
      'health.motor',
      'motor',
      '电机异常检测',
      'motor',
      'health/motor',
      'HeartPulse',
      1
    )
) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
where parent.code = 'health';


insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
select
  parent.id,
  child.code,
  child.name,
  child.label,
  child.node_key,
  child.path_url,
  child.icon,
  'tunnel_workspace',
  child.sort_order
from system.menus parent
cross join (
  values
    (
      'data.rings',
      'rings',
      '数据统计',
      'rings',
      'data/rings',
      'HeartPulse',
      0
    ),
    (
      'data.history',
      'history',
      '历史数据',
      'history',
      'data/history',
      'HeartPulse',
      1
    ),
    (
      'data.ringEfficiency',
      'ringEfficiency',
      '环时效分析',
      'ringEfficiency',
      'data/ring-efficiency',
      'HeartPulse',
      2
    )
) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
where parent.code = 'data';

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
select
  parent.id,
  child.code,
  child.name,
  child.label,
  child.node_key,
  child.path_url,
  child.icon,
  'tunnel_workspace',
  child.sort_order
from system.menus parent
cross join (
  values
    (
      'settings.message',
      'message',
      '系统推送设置',
      'message',
      'settings/message',
      'Settings',
      0
    ),
    (
      'settings.project',
      'project',
      '项目配置',
      'project',
      'settings/project',
      'Settings',
      1
    ),
    (
      'settings.equipment',
      'equipment',
      '设备配置',
      'equipment',
      'settings/equipment',
      'Settings',
      2
    ),
    (
      'settings.tunnel',
      'tunnel',
      '区间管理',
      'tunnel',
      'settings/tunnel',
      'Settings',
      3
    )
) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
where parent.code = 'settings';

insert into system.menus (
  parent_id,
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  menu_scope,
  sort_order
)
select
  parent.id,
  child.code,
  child.name,
  child.label,
  child.node_key,
  child.path_url,
  child.icon,
  'tunnel_workspace',
  child.sort_order
from system.menus parent
cross join (
  values
    (
      'material.tbmAllot',
      'tbmAllot',
      '设备履历',
      'tbmAllot',
      'material/tbm-allot',
      'HeartPulse',
      0
    ),
    (
      'material.documents',
      'documents',
      '文档管理',
      'documents',
      'material/documents',
      'HeartPulse',
      1
    )
) as child(
  code,
  name,
  label,
  node_key,
  path_url,
  icon,
  sort_order
)
where parent.code = 'material';

