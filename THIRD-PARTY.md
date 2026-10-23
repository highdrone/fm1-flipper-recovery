# Provenance and dependencies

This repository is a curated derivative distribution of
[merthsoft/flipper-fm1-recovery](https://github.com/merthsoft/flipper-fm1-recovery),
revision `df88b86`. The Flipper boot-key implementation, Windows transport,
independent package parser, tests and application icon come from that project
under the Unlicense. Those components are not presented as newly authored here.
The Mac instructions, public documentation, Figma illustrations and CI packaging
are additions. The graphics and documentation added here use the same Unlicense.

No SLOOP firmware source, firmware package, flash dump, private trace, SDK cache
or third-party RAM-loader binary is included in the source repository.

External projects keep their own terms:

- [jl-uboot-tool](https://github.com/kagaimiq/jl-uboot-tool): MIT, copyright
  Andrey Grigoryev. Windows tools import its protocol implementation and obtain
  its RAM loader separately. Preserve its license when redistributing its files.
  This repository does not relicense or bundle the RAM-loader binary.
- [FM-1 Transporter](https://github.com/kurogedelic/FM-1-transporter): MIT;
  the upstream reference for ROM boot-key timing, protocol and preservation policy.
  Its RP2040 implementation is not bundled here.
- [Flipper firmware](https://github.com/flipperdevices/flipperzero-firmware) and
  [Momentum](https://github.com/Next-Flip/Momentum-Firmware): GPL-3.0 and their
  component licenses. The app uses their SDK/API; the Unlicense on this source
  does not override terms governing SDK/runtime code or linked components.
- [M-Flasher](https://github.com/jvitkauskas/m-flasher): MIT and its bundled-component
  notices. It is a separate download used by the Mac workflow; its source and
  executable are not included here.
- Python dependencies keep their own licenses. They are installed separately.

The Figma exports use outlined text and do not embed a font program. Editable
text in the design uses Atkinson Hyperlegible Mono; its font files are not bundled.
