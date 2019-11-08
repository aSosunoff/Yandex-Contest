function solve(inputString){
    let galaxyNumber = '(?:M|NGC)[0-9]+',

        _distance = '(?:[1-9]0*)+(?:\\.[0-9]+)?',
        _angelPolar = '(?:(?:\\d{1,2})|(?:[12]\\d{2})|(?:3[0-5]\\d)|360)(?:\\.[0-9]+)?',
        _angelZenith = '(?<zenith>(?:(?:\\d{1,2})|(?:1[0-7]\\d)|(?:180))(?:\\.[0-9]+)?)',
        clusterCoordinates = `\\(${_distance}; ${_angelPolar}; ${_angelZenith}\\)`,

        _class = '[AIGKFM]',
        _star = '[0-9]+',
        _earth = '(?<earth>[0-9]+)',
        classStarEarth = `${_class}-${_star}#${_earth}`,
        identifier = '[0-9]+';

    let allRule = `(${galaxyNumber}) (${clusterCoordinates}) (${classStarEarth}) (${identifier})`;

    let regexp = new RegExp(allRule);

    if(regexp.test(inputString)){
        let res = regexp.exec(inputString);
        return `${res.groups.zenith <= 90 ? 0 : 1} ${res.groups.earth}`;
    }

    return '';
}

solve('NGC5105 (26161.426; 315.957; 80.131) A-6505#3 205022301735');