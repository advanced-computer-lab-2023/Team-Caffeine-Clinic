import { JitsiMeeting } from '@jitsi/react-sdk'
import { useAuthContext } from '../hooks/useAuthContext';

const Meeting = () => {
    const user = useAuthContext()

    return (
        <JitsiMeeting
            //appId={YOUR_APP_ID}
            roomName="Hi"
            displayName={"Hello"}
            domain={"meet.jit.sit"}
            containerStyles={{display: "flex", flex: 1}}
            //jwt={YOUR_VALID_JWT}
            // configOverwrite={{
            //     disableThirdPartyRequests: true,
            //     disableLocalVideoFlip: true,
            //     backgroundAlpha: 0.5
            // }}
            // interfaceConfigOverwrite={{
            //     VIDEO_LAYOUT_FIT: 'nocrop',
            //     MOBILE_APP_PROMO: false,
            //     TILE_VIEW_MAX_COLUMNS: 4
            // }}
            // spinner={SpinnerView}
            // onApiReady={(externalApi) => { ... }}
        />
    );
}

export default Meeting