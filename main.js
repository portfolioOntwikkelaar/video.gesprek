let client = AgoraRTC.createClient({mode:'rtc', 'codec':"vp8"})

let config = {
  appid: 'a81b6143b38e4b7494e145b6f274897f',
  token: '006a81b6143b38e4b7494e145b6f274897fIABx49w0Px7NAeXa/w3z3q2sjm4AO8iGpw+vHVlew4JjRW9N4VkAAAAAEACu7KwLHdnNYQEAAQAd2c1h',
  uid: null,
  channel: 'wrestler3',
}

let localTracks = {
  audioTracks: null,
  videoTracks: null,
}

let remoteTracks = {}
document.getElementById('join-btn').addEventListener('click', async ()=> {
  console.log('Gebruiker in gesprek')
  await joinStreams()
})

let joinStreams = async () => {

  [config.uid, localTracks.audioTracks, localTracks] = await Promise.all([
    client.join(config.appid, config.channel, config.token),
    AgoraRTC.createMicrophoneAudioTrack(),
    AgoraRTC.createCameraVideoTrack(),

  ])

  let videoPlayer = `<div class="video-containers" id="video-wrapper-${config.uid}">
  <p class="user-uid">${config.uid}</p>
  <div class="video-player player" id="stream-${config.uid}"></div>
  </div>`
  document.getElementById('user-streams').insertAdjacentHTML('beforeend', videoPlayer)
  localTracks.videoTracks.play(`stream-${config.uid}`)

  await client.publish([localTracks.audioTracks, localTracks.videoTracks])
}