'use strict';
import React from 'react';
import {render} from 'react-dom';
import Say from '../../components/say-react/say-react';

render(<Say msg="黄晓明"></Say>, document.getElementById('say_container'));
