# Homelab Server Build

Komplette Doku für Simons Homelab-Setup im Schlafzimmer. **Drei Preisklassen**
mit gebrauchten Dell PowerEdge Servern, alles im 19"-Rack inkl. Switched-PDU.
Local AI via Tesla P40 / RTX 3090. Cloudflare-Wake-Problem über Edge-Box gelöst.

## Drei Tiers

| Tier | Hardware | RAM | GPU | Total |
|---|---|---|---|---|
| **Einsteiger** | Dell R720 (DDR3) | 64 GB (128 +€100) | — (später) | **~€870** |
| **Medium ★** | Dell R730 (DDR4) | 128 GB | Tesla P40 24 GB | **~€1.685** |
| **Pro** | Dell R740 (DDR4) | 256 GB (128 −€400) | RTX 3090 24 GB | **~€3.705** |

Verdict: **Medium ist der Sweet-Spot** (best Preis-Leistung). DDR4-Sprung
gegenüber Einsteiger spart ~€65/Jahr Strom, GPU dabei für echte Local-AI.

RAM-Preise spiegeln April-2026-Markt (AI-Memory-Crunch). Used eBay/Kleinanzeigen
DE, Module-Preise: 16 GB DDR3 RDIMM €20–30 · 32 GB DDR4 RDIMM €80–130.

## Pages

- `index.html` — 3-Tier-Übersicht, Stats-Banner, Verdict-Block, Doku-Map
- `build.html` — Komponenten-für-Komponenten pro Tier (Server, Rack, PDU, GPU,
  Lüfter-Mod, Networking-Beigaben), inkl. Vergleichs-Tabelle und 5-Jahres-TCO
- `ai.html` — Local AI deep-dive: GPU-Vergleich (P40 vs 3060 vs 3090),
  Modelle (Llama 70B, Phi-4, Qwen, SDXL, Flux), Ollama+Open-WebUI Setup,
  GPU-Passthrough mit Proxmox, Performance-Werte, Cloud-API-Vergleich
- `deals.html` — eBay/Kleinanzeigen/ServerShop24 + Dell-PowerEdge-Spezifika
  (Service-Tag, iDRAC-Lizenzen, RAID-Controller, Caddies, GPU-Riser),
  realistische Preis-Ranges
- `software.html` — Proxmox, MC-VMs mit Aikar's Flags, Plex, Nextcloud (AIO),
  Portainer, Reverse-Proxy, Backups, Local-AI-Bridge zu ai.html, Monitoring
- `networking.html` — Cisco-SF-300-48p Limits, VLAN-Plan, **Edge-Box** +
  **Cloudflare-Tunnel-Wake-Lösung** (nginx + WoL-Script), Cloudflare Access,
  internes DNS
- `operations.html` — Lärm-Mod (Noctua + IPMI-Override), GPU-Cooling
  (Tesla-P40-Shroud), Stromverbrauch pro Tier, Rack-Aufstellung,
  Maintenance, DR, Security

## Wichtige Architektur-Entscheidungen

- **Gebrauchter Dell PowerEdge statt DIY:** explizit gewünscht für "Server-Look"
  + alles im Rack. Trade-off: lauter als Tower, aber Mod auf ~30 dB(A) machbar.
- **Edge-Box statt direktem Cloudflare-Tunnel:** der Tunnel ist outbound —
  schlafender Server = Tunnel down. Lösung: kleine Always-On-Maschine
  (vorhandener Optiplex DDR3 oder Pi 4) hostet Tunnel + WoL-Trigger.
- **Tesla P40 für Medium-Tier:** beste €/GB-VRAM-Ratio (€9/GB vs €27/GB bei
  3090). Pascal ist langsam pro FLOPS aber 24 GB ist 24 GB.
- **24/7 mit Power-Tuning statt Auto-Suspend:** Plex/Nextcloud brauchen 24/7.
  Suspend macht sie offline. Edge-Box ist trotzdem sinnvoll als Bastion-Host.
- **9U Open-Frame (Einsteiger) → 12U Open-Frame (Medium) → 15U Closed (Pro):**
  Closed nur in Pro weil Aktivlüftung dann mit ins Budget muss.
- **Switched PDU als Pflicht:** explizit gewünscht ("einzelne Geräte an/aus").
  Used APC AP7900B (~€100–140) ist die De-facto-Standard-Wahl.

## Stand

April 2026. Used-Preise schwanken stark — `deals.html` für aktuelle Ranges,
Geizhals-Preisalarm + Kleinanzeigen-Suchabos einrichten.
