insert into eqp.mqtt_user (
  username,
  user_type,
  password_hash,
  salt,
  is_superuser,
  topic_prefix
)
values (
  'ct-platform',
  'platform',
  encode(
    digest(
      'StrongPassword123' || 'a8f92c31',
      'sha256'
    ),
    'hex'
  ),

  'a8f92c31',

  true,
  'chengtong/#'
);