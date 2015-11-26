{__} = require('i18n')
$translate = require('translate')
foo = (str) -> str

foo('dont translate this')
$translate('translate this')
bar = __('translate me')
