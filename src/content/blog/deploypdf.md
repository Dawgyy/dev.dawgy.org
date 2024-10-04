---
title: 'Génération et déploiement automatisés de PDFs sur un VPS'
date: '2024-09-27'
resume: "L'automatisation de la génération de fichiers PDF à partir de fichiers Org Mode et LaTeX, suivie de leur déploiement sur un serveur VPS, peut être réalisée en quelques étapes clés. Cela inclut la compilation des fichiers source, la fusion des PDF et la mise en ligne sur le serveur distant via des commandes spécifiques."
---

L'automatisation de la génération de fichiers PDF à partir de fichiers Org Mode et LaTeX, suivie de leur déploiement sur un serveur VPS, peut être réalisée en quelques étapes clés. Cela inclut la compilation des fichiers source, la fusion des PDF et la mise en ligne sur le serveur distant via des commandes spécifiques.

## Étapes du processus

1. **Compilation des fichiers source**  
   Les fichiers Org Mode sont d'abord convertis en PDF à l'aide d'Emacs, tandis que les fichiers LaTeX (comme une page de couverture) sont compilés séparément via `pdflatex`. L'exportation de l'Org Mode vers un PDF est gérée par Emacs avec une commande dédiée.

2. **Fusion des PDFs**  
   Une fois les fichiers PDF générés, ils sont fusionnés en un seul document. Cet assemblage est réalisé à l'aide de commandes comme `pdftk`, qui permet de combiner le PDF de la page de couverture avec le PDF généré à partir du fichier Org Mode.

3. **Déploiement sur le VPS**  
   Le fichier PDF final est transféré sur le serveur VPS via `rsync`, un outil performant pour synchroniser des fichiers à distance. Le fichier est ensuite déposé dans un répertoire défini sur le serveur, par exemple, `/var/www/html`. Après le transfert, une commande de redémarrage d'Apache est exécutée pour rendre le PDF accessible en ligne.

4. **Nettoyage des fichiers temporaires**  
   Une fois les PDFs déployés, les fichiers temporaires générés durant la compilation (fichiers `.aux`, `.log`, etc.) sont supprimés pour maintenir un environnement propre.

## Exemple de code

```Makefile
TEX_CMD = pdflatex
ORG_CMD = emacsclient -e '(progn (find-file "$(ORG_SOURCE)") (org-latex-export-to-pdf))'
PDFUNITE_CMD = pdfunite
PDFTK_CMD = pdftk

COVER_PAGE ?= $(COVER_PAGE_FILE)
ORG_SOURCE ?= $(ORG_FILE)
OUTPUT_PDF ?= $(OUTPUT_FILE)

VPS_USER = root
VPS_IP = server1.dawgy.org
VPS_PATH = /var/www/html/infohers

APACHE_RESTART_CMD = sudo service apache2 restart

all: pdf deploy clean

pdf: $(COVER_PAGE) $(ORG_SOURCE) $(TEMPLATE)
	@echo "Compiling Org Mode file: $(ORG_CMD)"
	$(ORG_CMD)
	@echo "Compiling LaTeX cover page: $(TEX_CMD) $(COVER_PAGE)"
	$(TEX_CMD) $(COVER_PAGE)
	@echo "Merging PDF files"
	$(PDFTK_CMD) $(COVER_PAGE:.tex=.pdf) $(ORG_SOURCE:.org=.pdf) cat output $(OUTPUT_PDF)

deploy:
	@echo "Deploying to VPS..."
	rsync -avz $(OUTPUT_PDF) $(VPS_USER)@$(VPS_IP):$(VPS_PATH)
	ssh $(VPS_USER)@$(VPS_IP) "$(APACHE_RESTART_CMD)"
	@echo "Deployment complete."

clean:
	rm -rf *.aux *.log *.out $(COVER_PAGE:.tex=.pdf) $(ORG_SOURCE:.org=.pdf) _minted-notes
clear:
	rm -rf *.aux *.log *.out  _minted-notes $(COVER_PAGE:.tex=.pdf)

.PHONY: all pdf clean

```

Ce Makefile permet d'automatiser toutes ces étapes, de la compilation à la mise en ligne, avec des commandes simples et efficaces.
