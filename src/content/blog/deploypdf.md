---
title: 'Automated PDF Generation and Deployment on a VPS'
date: '2024-09-27'
resume: 'Automating PDF generation from Org Mode and LaTeX files, followed by their deployment on a VPS server, can be achieved in a few key steps. This includes compiling source files, merging PDFs, and uploading to the remote server via specific commands.'
---

Automating PDF generation from Org Mode and LaTeX files, followed by their deployment on a VPS server, can be achieved in a few key steps. This includes compiling source files, merging PDFs, and uploading to the remote server via specific commands.

## Process Steps

1. **Compiling Source Files**  
   Org Mode files are first converted to PDF using Emacs, while LaTeX files (like a cover page) are compiled separately via `pdflatex`. Exporting from Org Mode to PDF is handled by Emacs with a dedicated command.

2. **Merging PDFs**  
   Once PDF files are generated, they are merged into a single document. This assembly is done using commands like `pdftk`, which allows combining the cover page PDF with the PDF generated from the Org Mode file.

3. **Deployment on the VPS**  
   The final PDF file is transferred to the VPS server via `rsync`, a powerful tool for synchronizing files remotely. The file is then placed in a defined directory on the server, for example, `/var/www/html`. After the transfer, an Apache restart command is executed to make the PDF accessible online.

4. **Cleaning Temporary Files**  
   Once the PDFs are deployed, temporary files generated during compilation (`.aux`, `.log` files, etc.) are deleted to maintain a clean environment.

## Code Example

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

This Makefile allows automating all these steps, from compilation to online publishing, with simple and efficient commands.
