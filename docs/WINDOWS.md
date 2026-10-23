# Recover on Windows

The included transport scripts use Windows SCSI passthrough. They are adapted
from the credited upstream project and require an administrator PowerShell.
Start after the Flipper has put the FM-1 in ROM mode and the computer detects
`WL82 UBOOT1.00` (`4C4A:8057`).

## Dependencies

```powershell
git clone https://github.com/kagaimiq/jl-uboot-tool.git .local/jl-uboot-tool
python -m pip install --target .local/python crcmod pycryptodomex
Get-CimInstance Win32_DiskDrive | Select-Object DeviceID, Model
```

Record the physical drive belonging to **WL82 UBOOT1.00**, not any normal disk.
Replace `<N>` below with that drive's actual number. Never guess the number.

## Two-read backup

```powershell
python tools/pc_backup.py --device '\\.\PHYSICALDRIVE<N>' `
  --reference .local/jl-uboot-tool --dependencies .local/python `
  --output .local/private-backup
```

The tool validates inquiry/chip/flash identity, reads flash twice, and requires
identical files. The process stays running to keep the RAM loader alive. Keep it
running and note its PID while preparing restoration. Never publish the backup.

## Offline plan

In a second administrator PowerShell:

```powershell
python tools/pc_restore.py --device '\\.\PHYSICALDRIVE<N>' `
  --reference .local/jl-uboot-tool --dependencies .local/python `
  --backup .local/private-backup --package .local/firmware.fwsc
```

Without `--write`, this sends no device commands. Inspect `restore.log` in the
private backup directory. Package integrity, FM-1 identity, chip family, encryption
key and flash layout must pass. The parser accepts compatible FM-1 packages;
it does not use a firmware-version allowlist.

## Restore

Repeat the plan command with `--write --keeper-pid <PID>`, replacing `<PID>` with
the still-running backup keeper's process ID. The writer takes over its keepalive,
compares a fresh full read with both saved reads, changes only differing application
sectors in `[0x4000, 0x93000)`, verifies each sector and then the complete image,
and requests a restart. It preserves the bootloader and device data.

Do not disconnect until complete. Erases and writes are not blindly retried after
a transport error. On a failure, retain private backups and logs and investigate
before attempting another write.
