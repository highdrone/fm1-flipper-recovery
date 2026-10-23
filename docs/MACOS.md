# Recover on macOS

The Flipper application only forces ROM entry. On a Mac, use the separate
[M-Flasher project](https://github.com/jvitkauskas/m-flasher) to back up and restore.
M-Flasher 0.5.1 with its loader 1.2 was used for the documented Mac workflow.
The Windows Python transport in this repository does not run on macOS.

## Prepare before the cable handoff

1. Download the Mac release of M-Flasher from its author and follow that project's
   installation instructions. If macOS asks to open the unsigned app, review its
   origin and use the normal Privacy & Security flow.
2. Download the desired `.fwsc` package from its author or a trusted mirror.
   Compare its SHA-256 with the publisher's checksum, where provided.
3. Have a private local directory ready for full flash backups.
4. Complete the [Flipper boot-key procedure](../README.md#put-the-fm-1-into-rom-recovery).
   Keep the FM-1 powered on while moving its cable to the Mac.

## Back up

Open M-Flasher promptly after connecting the ROM device. macOS may ask for an
administrator password to release the USB interface from its disk driver.

Command-line equivalent:

```sh
/Applications/M-Flasher.app/Contents/MacOS/M-Flasher find
/Applications/M-Flasher.app/Contents/MacOS/M-Flasher backup ./private-backups
```

The connected target must be the FM-1's `WL82 UBOOT1.00` interface. Confirm that
the tool identifies FM-1, chip key `0x980F` and flash `0x856014`. The documented
workflow read the full 1 MiB flash twice and obtained identical backups; each
read was also checked against the chip's CRC32. Save those backups privately.

## Install the application

```sh
/Applications/M-Flasher.app/Contents/MacOS/M-Flasher firmware ./firmware.fwsc --backup-dir ./private-backups
```

Inspect the proposed write range and confirm only when it is the intended unit
and package. Do **not** add `--with-bootloader` or `--wipe-settings`. The normal
operation backs up before writing and verifies changed data against the device.
Do not disconnect while it writes or verifies.

## Start the restored instrument

After successful verification, unplug USB, switch the FM-1 off for five seconds,
and switch it on normally without holding keys. Reconnect USB when it has started.
Check the screen and MIDI interface. A verified write and a successful cold boot
are separate checks; keep the backups until both are complete.

SLOOP 2.8 was restored and confirmed to load using this application-only path.
No personal device dump, serial number or recovery log is included here.
