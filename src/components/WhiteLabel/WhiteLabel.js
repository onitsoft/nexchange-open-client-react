import React from 'react';

import VideoCard from './VideoCard/VideoCard'
import KeyFeatures from './KeyFeatures/KeyFeatures'
import MajorCard from './MajorCard/MajorCard'
import SupportedAssets from './SupportedAssets/SupportedAssets'
import MinorCard from './MinorCard/MinorCard'
import WhiteLabelFAQ from './WhiteLabelFAQ/WhiteLabelFAQ';


function WhiteLabel() {
    return (
        <React.Fragment>
            <VideoCard />
            <KeyFeatures />
            <MajorCard />
            <SupportedAssets />
            <MinorCard topic="interface" />
            <MinorCard topic="security" />
            <MinorCard topic="techreq" />
            <WhiteLabelFAQ />
        </React.Fragment>
    )
}

export default WhiteLabel