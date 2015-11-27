{__} = require('i18n')
$translate = () -> 'hello'
foo = (str) -> str

foo('dont translate this')
$translate('translate this')
bar = __('translate me')

__('sdf')
__('e s')
__('%d sdssdsds')
